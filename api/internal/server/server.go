package server

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"api/internal/database"
)

type FiberServer struct {
	*fiber.App

	db *gorm.DB
}

func New() *FiberServer {
	server := &FiberServer{
		App: fiber.New(fiber.Config{
			ServerHeader: "api",
			AppName:      "api",
		}),

		db: database.New(),
	}

	return server
}
