package main

import (
	"image/color"
	"net/http"

	"github.com/jdxyw/generativeart"
	"github.com/jdxyw/generativeart/arts"
	"github.com/jdxyw/generativeart/common"
)

func cmap(r, m1, m2 float64) color.RGBA {
	rgb := color.RGBA{
		uint8(common.Constrain(m1*470*r, 0, 255)),
		uint8(common.Constrain(r*122, 0, 225)),
		uint8(common.Constrain(m2*255*r, 140, 255)),
		255,
	}
	return rgb
}

func domainWrap() ([]byte, error) {
	canvas := generativeart.NewCanva(1000, 1400)
	canvas.SetBackground(common.Black)
	canvas.FillBackground()
	canvas.Draw(arts.NewDomainWrap(0.01, 4, 4, 20, cmap))
	imageBytes, err := canvas.ToBytes()
	if err != nil {
		return nil, err
	}
	return imageBytes, nil
}

func imageHandler(w http.ResponseWriter, r *http.Request) {
	imageBytes, err := domainWrap()
	if err != nil {
		http.Error(w, "Failed to generate image", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "image/jpeg")

	if _, err := w.Write(imageBytes); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func main() {
	http.HandleFunc("/generate-wrap", imageHandler)
	http.ListenAndServe(":8080", nil)
}
