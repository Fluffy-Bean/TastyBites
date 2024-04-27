package api

type menuItem struct {
	Name   string   `json:"name"`
	Price  float32  `json:"price"`
	Labels []string `json:"labels"`
	Image  string   `json:"image"`
}

var sampleData = []menuItem{
	{
		Name:   "Bar of Soap",
		Price:  69.99,
		Labels: []string{"vegan", "spicy"},
	},
	{
		Name:   "Sock",
		Price:  21,
		Labels: []string{"vegan", "fish", "nut", "spicy"},
	},
	{
		Name:   "Brick",
		Price:  0,
		Labels: []string{"spicy"},
	},
	{
		Name:   "Toast",
		Price:  4382749832743,
		Labels: []string{"gluten"},
	},
	{
		Name:   "water",
		Price:  1,
		Labels: []string{"fish"},
	},
	{
		Name:   "half eaten mouldy bread",
		Price:  -9999,
		Labels: []string{"nut"},
	},
	{
		Name:   "GwaGwa",
		Price:  69,
		Labels: []string{"nut"},
		Image:  "/dab.jpg",
	},
	{
		Name:   "Hogermellon",
		Price:  1111,
		Labels: []string{"fish"},
		Image:  "/wathog.jpg",
	},
	{
		Name:   "Blue HOGGGGG",
		Price:  0,
		Labels: []string{"nut", "gluten", "spicy"},
		Image:  "/sonichog.jpg",
	},
}
