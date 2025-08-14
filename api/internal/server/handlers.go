package server

import (
	"api/internal/models"
	"api/pkg/auth"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type SignupRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// auth handlers
// signup handler
func (s *FiberServer) SignUpHandler(c *fiber.Ctx) error {
	body := new(SignupRequest)

	if err := c.BodyParser(body); err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	if body.Email == "" || body.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "Password or email cannot be empty",
		})
	}

	var existingUser models.User
	result := s.db.Where("email = ?", body.Email).First(&existingUser)

	if result.Error == nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "User with that email already exists",
		})
	}

	if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
			"message": "Database error",
			"error":   result.Error.Error(),
		})
	}

	// hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
			"message": "Error hashing password",
			"error":   result.Error.Error(),
		})
	}

	newUser := &models.User{
		Email:    body.Email,
		Password: string(hashedPassword),
	}

	if err = s.db.Create(&newUser).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
			"message": "Error creating user",
			"error":   err.Error(),
		})
	}

	token, err := auth.GenerateToken(newUser)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
			"message": "Error generating jwt token",
			"error":   err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{"token": token})
}

type SigninRequest struct {
	Email    string
	Password string
}

// login handler
func (s *FiberServer) SigninHandler(c *fiber.Ctx) error {
	body := new(SigninRequest)

	if err := c.BodyParser(body); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
			"message": "Error parsing json body",
			"error":   err.Error(),
		})
	}

	if body.Email == "" || body.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "Email or password cannot be empty",
		})
	}

	var existingUser models.User

	result := s.db.Where("email = ?", body.Email).First(&existingUser)

	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": "An account with that email does not exist",
			})
		} else {
			return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
				"message": "Error querying the database",
				"error":   result.Error.Error(),
			})
		}
	}

	if err := bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(body.Password)); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "Invalid email or password",
		})
	}

	token, err := auth.GenerateToken(&existingUser)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
			"message": "Error generating jwt token",
			"error":   err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"token": token,
	})
}

func (s *FiberServer) ProtectedHandler(c *fiber.Ctx) error {
	userId, ok := c.Locals("userId").(uint)
	log.Info(ok)
	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "this route is protected",
		"userId":  userId,
	})
}
