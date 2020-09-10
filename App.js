import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, TouchableHighlight,Alert, AsyncStorage, Dimensions, ScrollView } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
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

restarUnidad(idProducto){
  const arrayData = []
  let datos = []
  this.state.list.map((data, i)=> {
    if(data.idProducto == idProducto ){
      var suma = parseInt(data.cantidad) - 1
      if(suma < 0){
        suma = 0
      }
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
          <Text> </Text>
          <TouchableHighlight style={styles.button} onPress = {()=> this.restarUnidad(data.idProducto) } >
            <Text style={styles.textButton}>Restar unidad</Text>
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
 {/* {this.parseData()} */}
</View>

{/* --------CARD-------- */}
<View style={{ 
  width:"100%", 
  height:150,
  backgroundColor:"white", 
  flexDirection:"row", 
  borderRadius:15,
  shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
   }} >
{/* -----ESPACIO DE LA IMAGEN--------- */}
 <View style={{ width:150, height:150, backgroundColor:"blue" }} >
 <Image
  style={{flex:1, height: undefined, width: undefined}}
  source={require('./assets/idea.jpg')}
  resizeMode="contain"
/>
 </View>
 {/* -----FIN ESPACIO DE LA IMAGEN--------- */}
 <View style={{flex:1, backgroundColor:"white", padding:5, borderRadius:15 }} >
 
 {/* -----BOTON ELIMINAR--------- */}
<TouchableHighlight style = {{ position:"absolute", right:6, top:5 , backgroundColor:"gray", width:20, height:20, borderRadius:15 }}
onPress={()=> alert("Eliminar") } >
  <Text style={{color:"white", textAlign:"center" }}>X</Text>
</TouchableHighlight>
{/* -----FIN BOTON ELIMINAR--------- */}

  <View style={{ width:"90%", backgroundColor:"white" }} >

  {/* -----TITULO--------- */}
  <ScrollView 
  style={{ 
    height:37,
    width:"100%"
  }}
  //pagingEnabled={true}
  ref="scrollView"
  scrollEnabled={true}
  horizontal={false}
  persistentScrollbar={false}
  >
   <Text style={{fontWeight:"bold"}} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nunc purus, bibendum a malesuada in</Text>
  </ScrollView>
   {/* -----FIN TITULO--------- */}

{/* -----DESCRIPCION--------- */}
   <ScrollView 
   style={{ 
    height:51,
    left:-1, 
    width:"100%"
    }}
    pagingEnabled={true}
    ref="scrollView"
    scrollEnabled={true}
    horizontal={false}
    persistentScrollbar={true}
    nestedScrollEnabled={true}
   >
  <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nunc purus, bibendum a malesuada in</Text>
  </ScrollView>
  {/* -----FIN DESCRIPCION--------- */}

  {/* -----PRECIOS--------- */}
  <View>
   <Text style={{textAlign:"center" }} >$1000</Text>
   <View style={{height:5}} />
   {/* -----SUMAR Y RESTAR--------- */}
    <View style={{ flexDirection:"row", justifyContent:"center" }} >
    {/* RESTAR */}
      <View style = {{ width:25, height:25, backgroundColor:"red", borderRadius:25 }} >
        <Text style={{color:"white", textAlign:"center", fontSize:18, fontWeight:"bold" }} >-</Text>
      </View>
    {/* FIN RESTAR */}

   {/* INPUT DE VALORES  */}
   <View style = {{ width:60, height:23, backgroundColor:"green", borderRadius:15 }} >
     <Text style={{ textAlign:"center", color:"black" }} >5 UND</Text>
   </View>
   {/* FIN INPUT DE VALORES */}

   {/* SUMAR */}
   <View style = {{ width:25, height:25, backgroundColor:"blue", borderRadius:25 }} >
        <Text style={{color:"white", textAlign:"center", fontSize:18, fontWeight:"bold" }} >+</Text>
      </View>
    {/* FIN SUMAR */}

    </View>
   {/* -----FIN SUMAR Y RESTAR--------- */}
  </View>

  </View>
 </View>
</View>
{/* --------FIN CARD-------- */}

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