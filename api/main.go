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

func perlinPerls() ([]byte, error) {
	canvas := generativeart.NewCanva(1000, 1400)
	canvas.SetBackground(common.DarkSalmon)
	canvas.SetAlpha(120)
	canvas.SetLineWidth(0.4)
	canvas.FillBackground()
	canvas.SetIterations(200)
	canvas.Draw(arts.NewPerlinPerls(10, 200, 40, 80))
	imageBytes, err := canvas.ToBytes()
	if err != nil {
		return nil, err
	}
	return imageBytes, nil
}

func blackHole() ([]byte, error) {
	canvas := generativeart.NewCanva(1000, 1400)
	canvas.SetBackground(color.RGBA{R: 30, G: 30, B: 30, A: 255})
	canvas.FillBackground()
	canvas.SetLineWidth(1.0)
	canvas.SetLineColor(common.Tomato)
	canvas.Draw(arts.NewBlackHole(200, 400, 0.01))
	imageBytes, err := canvas.ToBytes()
	if err != nil {
		return nil, err
	}
	return imageBytes, nil
}

func wrapHandler(w http.ResponseWriter, r *http.Request) {
	imageBytes, err := domainWrap()
	if err != nil {
		http.Error(w, "Failed to generate image", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "image/jpeg")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if _, err := w.Write(imageBytes); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func perlinHandler(w http.ResponseWriter, r *http.Request) {
	imageBytes, err := perlinPerls()
	if err != nil {
		http.Error(w, "Failed to generate image", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "image/jpeg")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if _, err := w.Write(imageBytes); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func blackHoleHandler(w http.ResponseWriter, r *http.Request) {
	imageBytes, err := blackHole()
	if err != nil {
		http.Error(w, "Failed to generate image", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "image/jpeg")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if _, err := w.Write(imageBytes); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func main() {
	http.HandleFunc("/generate-wrap", wrapHandler)
	http.HandleFunc("/perlin-perls", perlinHandler)
	http.HandleFunc("/black-hole", blackHoleHandler)
	http.ListenAndServe(":8080", nil)
}
