import React from "react"
import { io } from 'socket.io-client'
import "../assets/app.css"
import Swal from 'sweetalert2'

let socket;

class Game extends React.Component{

    constructor(){
        super();
        this.array = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ]
        this.state={
            b1:"",
            b2:"",
            b3:"",
            b4:"",
            b5:"",
            b6:"",
            b7:"",
            b8:""
        }
        this.wins=0
        this.loses=0
        this.marca=""
        this.marcaOpponnent=""
        this.socketOpponentId=""
        this.socketId=""
        this.turno=false
        this.arrayList=[[],[],[],[],[],[],[],[],[]]

    }
    componentDidMount(){
        socket = io.connect('ws://localhost:3001')  //'ws://localhost:3000'
        socket.on('connection',  (data) =>{
            console.log(data)
            this.socketId=socket.id
            console.log(this.socketId)
            this.marca="X"
            this.marcaOpponnent="O"
        } )
        socket.on('WIN!!!!', (dato)=>{
            console.log(dato)
        })

        socket.emit('quedo')

        socket.on('SEDGUNDO', (data)=>{
            if(this.socketId!=""){
                this.socketOpponentId=data
                this.marca="O"
                this.marcaOpponnent="X"
                this.turno=true
                console.log(this.socketOpponentId)
            }
        })
        socket.on('PRIMERO', (data)=>{
            if(this.socketId!=""){
                this.socketOpponentId=data
                console.log(this.socketOpponentId)
            }
        })

        socket.on('CLEAR', ()=>{
            this.clearBtns()
            console.log(this.turno)
        })

        socket.on('msj-output-client', (data) => {
            console.log(data);
            if(data.idOpponent== this.socketId){
                let posicion= data.posicion
                this.arrayList[data.index]=data.mrc
                this.setState({
                    [posicion] : data.mrc
                })
                this.ganador()

                if(this.turno==false){
                    this.turno=true
                }else{
                    this.turno=false
                }
            }
        });

    }
    ganador(){
        for (let x = 0; x < this.array.length; x++) {
            if(this.arrayList[this.array[x][0]]== "X" &&
                this.arrayList[this.array[x][1]]== "X" &&
                this.arrayList[this.array[x][2]]== "X" ){
                if(this.marca=="X"){
                    Swal.fire({
                        title: 'FELICIDADES HAS GANADO :)!!',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonText: '¿DESEA VOLVER A GANAR?',
                        timer:5000
                    })
                    this.wins++
                }else{
                    Swal.fire({
                        title: 'HA PERDIDO :(!!',
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonText: '¿DESEA VOLVER A JUGAR?!',
                        timer:5000
                    })
                    this.loses++
                }

                this.clearEmit()
            }
        }
        for (let x = 0; x < this.array.length; x++) {
            if(this.arrayList[this.array[x][0]]== "O" &&
                this.arrayList[this.array[x][1]]== "O" &&
                this.arrayList[this.array[x][2]]== "O" ){
                if(this.marca=="O"){
                    Swal.fire({
                        title: 'FELICIDADES HA GANADO :)!!',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonText: '¿DESEA VOLVER A JUGAR?',
                        timer:5000
                    })
                    this.wins++
                }else{
                    Swal.fire({
                        title: 'HA PERDIDO :(!!',
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonText: '¿DESEA VOLVER A JUGAR?',
                        timer:5000
                    })
                    this.loses++
                }
                this.clearEmit()
            }
        }

    }
    changeValue(e) {
        let pos = e.target.name
        let idx= e.target.id

        if (this.turno==true) {
            socket.emit('msj-input-server', { index: idx, posicion: pos, mrc: this.marca, idOpponent: this.socketOpponentId })
            this.arrayList[idx]=this.marca
            this.setState({
                [pos] : this.marca
            })
            this.turno=false

        }else{
            Swal.fire({
                title: 'LE TOCA EL TURNO AL OTRO JUGADOR',
                icon: 'error',
                showCancelButton: false,
                timer:1800
            })
        }


    }

    clearBtns(){
        this.arrayList=[[],[],[],[],[],[],[],[],[]]
        this.setState({
            b1:"",
            b2:"",
            b3:"",
            b4:"",
            b5:"",
            b6:"",
            b7:"",
            b8:"",
            b9:""
        })
    }

    clearEmit(){
        socket.emit('refrescar')
    }

    render(){
        return(

            <div className="container">
                <h1 className="title mt-4">JUEGO DEL GATOe</h1>
                <h3>Wins: {this.wins}</h3>
                <h3>Loses: {this.loses}</h3>
                <div id="tablero">
                    <input type="Button" id="0" name="b1" onClick={this.changeValue.bind(this)} defaultValue={this.state.b1}></input>
                    <input type="Button" id="1" name="b2" onClick={this.changeValue.bind(this)} defaultValue={this.state.b2}></input>
                    <input type="Button" id="2" name="b3" onClick={this.changeValue.bind(this)} defaultValue={this.state.b3}></input>
                    <input type="Button" id="3" name="b4" onClick={this.changeValue.bind(this)} defaultValue={this.state.b4}></input>
                    <input type="Button" id="4" name="b5" onClick={this.changeValue.bind(this)} defaultValue={this.state.b5}></input>
                    <input type="Button" id="5" name="b6" onClick={this.changeValue.bind(this)} defaultValue={this.state.b6}></input>
                    <input type="Button" id="6" name="b7" onClick={this.changeValue.bind(this)} defaultValue={this.state.b7}></input>
                    <input type="Button" id="7" name="b8" onClick={this.changeValue.bind(this)} defaultValue={this.state.b8}></input>
                    <input type="Button" id="8" name="b9" onClick={this.changeValue.bind(this)} defaultValue={this.state.b9}></input>
                </div>
            </div>

        )
    }
}
export default Game;