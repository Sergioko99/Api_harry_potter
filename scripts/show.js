import { html, LitElement } from "lit";
export class ShowUser extends LitElement{
    constructor(){
        super();
        this.dato = [];
        this.id = "";
    }

    static get properties(){
        return {
            dato: {type: Array},
            id: {type: String, attribute: "id"}
        }

    }

    update(changeProperties){
        super.update(changeProperties)
        if(changeProperties.has('id') && this.id){
            this.consumirApiId(this.id)
        }
    }

    render(){
       return html`
        ${this.dato.map((dato) => html`
                ${dato.image !== ''
                    ? html`<td><img src="${dato.image}" style="width: 100px; border-radius: 50%"></td>`
                    : html`<td><img src ='../i/default.webp' style="width: 100px; border-radius: 50%"></td>`
                }
                <table>
                    <tbody>
                        <tr>
                            <td>Nombre: </td>
                            <td>${dato.name}</td>
                        </tr>
                        <tr>
                            <td>especie</td>
                            <td>${dato.species}</td>
                        </tr>
                        <tr>
                            <td>Sexo</td>
                            <td>${dato.gender}</td>
                        </tr>
                        <tr>
                            <td>Casa</td>
                            <td>${dato.house}</td>
                        </tr>
                        <tr>
                            <td>Color de hojos</td>
                            <td>${dato.eyeColour}</td>
                        </tr>
                        <tr>
                            <td>Actor</td>
                            <td>${dato.actor}</td>
                        </tr>
                        <tr>
                            <td>Linaje</td>
                            <td>${dato.ancestry}</td>
                        </tr>
                    </tbody>
                </table>
            `)}
       `
    }


    consumirApiId(id){
        fetch(`https://hp-api.onrender.com/api/character/${id}`, {method: 'GET'})
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.dato = data
        })
        .catch((error) => {console.error(error);})
    }
}