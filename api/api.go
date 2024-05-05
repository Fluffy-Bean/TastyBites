package api

import (
	"net/http"

	db "github.com/Fluffy-Bean/TastyBites/database"
	"github.com/Fluffy-Bean/TastyBites/front"
	sb "github.com/huandu/go-sqlbuilder"
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

	apiGroup := r.Group("/api")
	apiGroup.GET("/items", func(e echo.Context) error {
		builder := db.ItemStruct.SelectFrom("Item").Select("*")
		query, args := builder.BuildWithFlavor(sb.SQLite)

		rows, err := db.Conn.Query(query, args...)
		defer rows.Close()
		if err != nil {
			r.Logger.Fatal(err)
			return e.String(http.StatusInternalServerError, "Could not query for data")
		}

		var items []db.Item
		for rows.Next() {
			var item db.Item
			err := rows.Scan(db.ItemStruct.Addr(&item)...)
			if err != nil {
				r.Logger.Fatal(err)
				return e.String(http.StatusInternalServerError, "Could not scan row")
			}
			items = append(items, item)
		}

		return e.JSON(http.StatusOK, items)
	})

	r.HideBanner = true
	r.Logger.Fatal(r.Start(c.Host))
}
