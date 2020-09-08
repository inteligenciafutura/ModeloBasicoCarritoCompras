import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, TouchableHighlight,Alert, AsyncStorage } from 'react-native';

export default class Tarjetas extends Component {

constructor(){
  super()
  try {
    AsyncStorage.getItem('database_form').then((value) => {
      this.setState({
        list: JSON.parse(value)
      })
    })
  } catch (error) {
    console.log(error)
  }
  this.state = {
    idProducto:'',
    name:'',
    cantidad:'',
    comment:'',
    list:''
  }
}

changeName(name){
  this.setState({name})
}

changeCantidad(cantidad){
  this.setState({cantidad})
}

changeComment(comment){
  this.setState({comment})
}

changeIdProducto(idProducto){
  this.setState({idProducto})
}

buttonPressed(){
  //1. creo el objeto vacio que voy a necesitar
  const arrayData = []

  //2. creo el objeto con la estructura que va a manejar
  const data = {
    idProducto: this.state.idProducto,
    name: this.state.name,
    cantidad: this.state.cantidad,
    comment: this.state.comment
  }
  arrayData.push(data);
  try{
    //comprobamos si existe datos
   AsyncStorage.getItem('database_form').then((value) => {
     if(value !== null ){
      const d = JSON.parse(value)
      d.push(data)
      AsyncStorage.setItem('database_form', JSON.stringify(d)).then(() => {
        Alert.alert("Voy a la lista de objetos")
      })
     }else{
       AsyncStorage.setItem('database_form', JSON.stringify(arrayData)).then(() => {
         Alert.alert("Voy a la siguiente pantalla")
       })
     }
   })
  }catch(error){
    console.log(error)
  }
}

sumarUnidad(idProducto){
  const arrayData = []
  let datos = []
  this.state.list.map((data, i)=> {
    if(data.idProducto == idProducto ){
      var suma = parseInt(data.cantidad) + 1
      ////////////////////////////
       datos.push( {
        idProducto: data.idProducto,
        name: data.name,
        cantidad: suma,
        comment: data.comment
      })
      ///////////////////////////
    }else{
      datos.push({
        idProducto: data.idProducto,
        name: data.name,
        cantidad: data.cantidad,
        comment: data.comment
      })
    }
   })
   arrayData.push(datos);
   //alert( JSON.stringify(datos) )
   AsyncStorage.setItem('database_form', JSON.stringify(datos)).then(()=> {
     //Alert.alert("Actualización completa")
     this.refreshCantidades()
   })
}

parseData(){
  if(this.state.list){
    return this.state.list.map((data, i)=> {
      return (
        <View key={i} 
        style = {styles.dataList}
        >
          <Text>idProducto: {data.idProducto}</Text>
          <Text>name: {data.name}</Text>
          <Text>cantidad: {data.cantidad}</Text>
          <Text>comment: {data.comment}</Text>
          <TouchableHighlight style={styles.button} onPress = {()=> this.sumarUnidad(data.idProducto) } >
            <Text style={styles.textButton}>Sumar unidad</Text>
          </TouchableHighlight>
        </View>
      )
    })
  }
}

refreshCantidades(){
  try {
    AsyncStorage.getItem('database_form').then((value) => {
      this.setState({
        list: JSON.parse(value)
      })
    })
  } catch (error) {
    console.log(error)
  }
}

render(){

//const data = JSON.stringify(this.state.list)

return (
<View style={styles.container}>
  <View>
  <Text style={styles.title}>Formulario</Text>

  <TextInput
   style={styles.input}
   placeholder="idProducto"
   value={this.state.idProducto}
   onChangeText = {(idProducto)=> this.changeIdProducto(idProducto) }
    />

   <TextInput
   style={styles.input}
   placeholder="Name"
   value={this.state.name}
   onChangeText = {(name)=> this.changeName(name) }
    />

  <TextInput
   style={styles.input}
   placeholder="cantidad"
   value={this.state.cantidad}
   onChangeText = {(cantidad)=> this.changeCantidad(cantidad) }
  />

   <TextInput
   multiline={true}
   style={[styles.input, styles.textArea]}
   placeholder="Comments"
   value={this.state.comment}
   onChangeText = {(comment)=> this.changeComment(comment) }
  />

  <TouchableHighlight style={styles.button} onPress={()=> this.buttonPressed() } >
    <Text style={styles.textButton}>Guardar</Text>
  </TouchableHighlight>

  </View>

{/* AQUI PINTO EL ARREGLO */}
<View>
 {this.parseData()}
</View>

</View>
);
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:10,
    paddingLeft:15,
    paddingRight:15
  },
  input:{
    height:40,
    borderColor:"#ccc",
    borderWidth:2, 
    marginBottom:20
  },
  title: {
    textAlign:"center"
  }, 
  button:{
    backgroundColor:"skyblue",
    paddingTop:15,
    paddingBottom:15
  }, 
  textButton:{
    textAlign:"center",
    color:"white"
  },
  textArea:{
    height:60
  }, 
  dataList: {
    marginTop:5,
    marginBottom:5
  }
});