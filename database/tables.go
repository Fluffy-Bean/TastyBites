package database

import (
	sb "github.com/huandu/go-sqlbuilder"
)

type Item struct {
	UUID        string   `json:"uuid" db:"uuid"`
	Name        string   `json:"name" db:"name"`
	Price       int64    `json:"price" db:"price"`
	Description string   `json:"description" db:"description"`
	Labels      []string `json:"labels,omitempty" db:"-"`
	Images      []string `json:"images,omitempty" db:"-"`
}

var ItemStruct = sb.NewStruct(new(Item))
