package server

import (
	"api/internal/models"

	"github.com/gofiber/fiber/v2"
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
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Password or email cannot be empty",
		})
	}

	var existingUser models.User
	result := s.db.Where("email = ?", body.Email).First(&existingUser)

	if result.Error == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "User with that email already exists",
		})
	}

	if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Database error",
			"error":   result.Error.Error(),
		})
	}

	// hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error hashing password",
			"error":   result.Error.Error(),
		})
	}

	newUser := &models.User{
		Email:    body.Email,
		Password: string(hashedPassword),
	}

	if err = s.db.Create(&newUser).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error creating user",
			"error":   result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(newUser)
}

// login handler
func (s *FiberServer) LoginHandler(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"helo": "login",
	})
}
