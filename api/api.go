package api

import (
	"net/http"

	"github.com/Fluffy-Bean/TastyBites/front"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Config struct {
	Host    string
	Logging bool
}

func Serve(c Config) {
	r := echo.New()

	if c.Logging {
		r.Use(middleware.Logger())
		r.Use(middleware.CORS())
	}
	r.Use(middleware.Recover())

	r.StaticFS("/", front.DistDir)

	api := r.Group("/api")
	api.GET("/items", func(e echo.Context) error {
		return e.JSON(http.StatusOK, sampleData)
	})

	r.HideBanner = true
	r.Logger.Fatal(r.Start(c.Host))
}