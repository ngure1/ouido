package server

import (
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func (s *FiberServer) RegisterFiberRoutes() {
	// Apply CORS middleware
	s.App.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS,PATCH",
		AllowHeaders:     "Accept,Authorization,Content-Type",
		AllowCredentials: false, // credentials require explicit origins
		MaxAge:           300,
	}))

	// middleware for protected routes
	s.App.Use([]string{"/protected"}, s.AuthMiddleware())

	s.App.Post("/signup", s.SignUpHandler)
	s.App.Post("/signin", s.SigninHandler)

	// example of a protected route
	s.App.Get("/protected", s.ProtectedHandler)
}
