package database

import (
	sb "github.com/huandu/go-sqlbuilder"
)

type Item struct {
	UUID        string `json:"uuid" db:"uuid"`
	Name        string `json:"name" db:"name"`
	Price       int64  `json:"price" db:"price"`
	Description string `json:"description,omitempty" db:"description"`
	//Labels      []string `json:"labels,omitempty" db:"labels"`
	//Images      []string `json:"images,omitempty" db:"images"`
}

var ItemStruct = sb.NewStruct(new(Item))
