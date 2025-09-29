import { rstyle } from "../../../studio/framework/css.js"

export default function Card({ title, description, imageUrl, className }) {
    return ({
        canvas: () => `
        <div class="card ${className}">
            <img src="${imageUrl}" alt="${title}" class="card-image"/>
            <div class="card-content">
                <h2 class="card-title">${title}</h2>
                <p class="card-description">${description}</p>
            </div>
        </div>
        `,
        style: rstyle('.card', {
            border: '1px solid #ddd',
            borderRadius: '8px',
        })+rstyle('.card-image', {
            width: '100%',
            borderTopLeftRadius: '8px',
        })+rstyle('.card-content', {
            padding: '16px',
        })+rstyle('.card-title', {
            fontSize: '1.5em',
            margin: '0 0 8px 0',
        })+rstyle('.card-description', {
            fontSize: '1em',
            color: '#555',
        })
    })
}