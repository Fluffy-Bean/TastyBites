package cmd

import (
    "github.com/Fluffy-Bean/TastyBites/front"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Serve() {
	r := echo.New()

	r.Use(middleware.Logger())
	r.Use(middleware.Recover())

	r.StaticFS("/", front.DistDir)

	r.Logger.Fatal(r.Start(":8080"))
}
