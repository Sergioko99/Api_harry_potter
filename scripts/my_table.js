import { css, html, LitElement } from "lit";
import { ShowUser } from "./show";

customElements.define('show-user', ShowUser);
export class MyTable extends LitElement{
    constructor(){
        super();
        this.datos = [];
        this.no_datos = [];
        this.input_text = "";
        this.consumirApi();
        this.options = [
            {value: "", text:"Selecciona una opcion"},
            {value: "Gryffindor", text:"Gryffindor"},
            {value: "Hufflepuff", text:"Hufflepuff"},
            {value: "Ravenclaw", text:"Ravenclaw"},
            {value: "Slytherin", text:"Slytherin"}
        ];
        this.option_house = "";
        this.selected = 3
        this.show_table = false;
        this.show_user = true;
        this.id = "";
    }

    static get properties(){
        return {
            datos: { type: Array},
            no_datos: { type: Array},
            input_text: {type: String},
            option_house: {type: String},
            options: {type: Array},
            id: {type: String}
        }

    }
    inputText(e){
        this.input_text = e.target.value;
        this.datos = this.no_datos.filter((no_datos) => 
            no_datos.name.toLowerCase().includes(this.input_text.toLowerCase()) &&
            (!this.option_house || no_datos.house === this.option_house)
        );
    }

    

    selectHouse(e){
        this.option_house = e.target.value;
        this.datos = this.no_datos.filter((no_dato) => 
            no_dato.house === this.option_house && 
            (this.input_text === '' || no_dato.name.toLowerCase().includes(this.input_text.toLowerCase()))
        );
    }

    static get styles() {
        return css`
        div {
            border: 2px, black, solid;
            border-radius: 20px;
            margin-top: 2%;
            padding: 4%;
          }
        .show_table {
            justify-items: center;
            margin-top: 50px;
        }
        img {
            width: 100px;
            border-radius: 50%;
        }
        table > thead {
            background-color: #A6342E;
            color: wheat;
            text-align: center;
            padding: 1%;
        }
        table > tbody {
            text-align: center;
        }
        `;
    } 

    showTable(){
        this.show_table = false;
        this.show_user = true;
    }

    render(){
       return html`
       <section class="show_table" ?hidden=${this.show_table}>
            <div>
                <input type="text" .value=${this.input_text} @input=${this.inputText} placeholder="Buscar por nombre">
                <select @change=${this.selectHouse}>
                    ${this.options.map(option => html`
                            <option .value="${option.value}" ?selected=${this.selected === option.value}>${option.text}</option>
                        `)}
                </select>
            </div>
            <div>
                <table>
                    <thead>
                        <td>Imagen</td>
                        <td>Nombre</td>
                        <td>Sexo</td>
                        <td>Actor</td>
                        <td>Casa</td>
                        <td>Acciòn</td>
                    </thead>
                    <tbody>
                        ${this.datos.map((dato) => html`
                                <tr>
                                    ${dato.image !== ''
                                    ? html`<td><img src="${dato.image}" style="width: 100px; border-radius: 50%"></td>`
                                    : html`<td><img src ='../i/default.webp' style="width: 100px; border-radius: 50%"></td>`
                                    }
                                    <td>${dato.name}</td>
                                    <td>${dato.gender}</td>
                                    <td>${dato.actor}</td>
                                    <td>${dato.house}</td>
                                    <td><button .value=${dato.id} @click=${this.clickInfo}>Info</button></td>
                                </tr>
                                `)}
                    </tbody>
                </table>
            </div>
       </section>
       <show-user @close-show=${this.mostrarTabla} ?hidden=${this.show_user} .id=${this.id}></show-user>
       `
    }

    mostrarTabla(){
        this.show_table = false;
        this.show_user = true;
        this.requestUpdate();
    }

    clickInfo(e){
        this.id = e.target.value;
        this.show_table = true;
        this.show_user = false;
    }

    consumirApi(){
        fetch('https://hp-api.onrender.com/api/characters', {method: 'GET'})
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.datos = data
            this.no_datos = data
        })
        .catch((error) => {console.error(error);})
    }
}