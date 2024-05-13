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

type JSONResponse struct {
	Data  interface{} `json:"data,omitempty"`
	Error string      `json:"error,omitempty"`
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
		var response JSONResponse
		type ItemResponse struct {
			Item []db.Item `json:"item"`
		}

		builder := db.ItemStruct.SelectFrom("Item").Select("*")
		query, args := builder.BuildWithFlavor(sb.SQLite)

		rows, err := db.Conn.Query(query, args...)
		defer rows.Close()
		if err != nil {
			r.Logger.Fatal(err)
			response.Error = "Could not query for data"
			return e.JSON(http.StatusInternalServerError, response)
		}

		var items []db.Item
		for rows.Next() {
			var item db.Item
			err := rows.Scan(db.ItemStruct.Addr(&item)...)
			if err != nil {
				r.Logger.Fatal(err)
				response.Error = "Failed to map response"
				return e.JSON(http.StatusInternalServerError, response)
			}
			items = append(items, item)
		}
		response.Data = ItemResponse{
			Item: items,
		}

		return e.JSON(http.StatusOK, response)
	})

	r.HideBanner = true
	r.Logger.Fatal(r.Start(c.Host))
}
