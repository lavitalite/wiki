package embed 

import (
	"time"
	"github.com/google/uuid"
)


type Embed struct {
	ID uui.UUID `json:id`
	gorm:"primary_key;type:uuid;default:uuid_generate_v4()"
	Type string `json:"type"`
	Aspect string `json:"aspect"`
	Src string `json:"src"`
	Title *string `json:"title,omitempty"`
	CreateAt time.Time `json:"created_at"`
}


type EmbedService interface {
	Create(embed *Embed) error
	GetById(id uuid.UUID) (*Embed, error)
	Update(embed *Embed) error
	Delete (id uuid.UUID) error
}