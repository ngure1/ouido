package server

import (
	"api/internal/models"
	"errors"
	"fmt"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/golang-jwt/jwt"
	"gorm.io/gorm"
)

const authHeaderPrefix = "Bearer"

func (s *FiberServer) AuthMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		authHeader := c.Get(fiber.HeaderAuthorization)

		if authHeader == "" {
			log.Warn("empty authorization header")

			return c.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"message": "Unauthorized",
			})
		}

		authHeaderParts := strings.Split(strings.Trim(authHeader, " "), " ")

		if len(authHeaderParts) != 2 || authHeaderParts[0] != authHeaderPrefix {
			log.Warn("invalid token parts")

			return c.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"message": "Unauthorized",
			})
		}

		tokenString := authHeaderParts[1]
		secret := os.Getenv("JWT_SECRET")

		token, err := jwt.Parse(tokenString, func(t *jwt.Token) (any, error) {
			if t.Method.Alg() != jwt.GetSigningMethod("HS256").Alg() {
				return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
			}
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			log.Warn("invalid token ", err.Error())

			return c.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"message": "Unauthorized",
			})
		}

		userId := uint(token.Claims.(jwt.MapClaims)["userId"].(float64))

		if err := s.db.Model(&models.User{}).Where("id = ?", userId).Error; errors.Is(err, gorm.ErrRecordNotFound) {
			log.Warn("user not found in the db")

			return c.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"message": "Unauthorized",
			})
		}

		c.Locals("userId", userId)

		return c.Next()
	}
}
