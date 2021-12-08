import React, {useState} from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, StatusBar, Alert, Image } from 'react-native';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [task, setTask] = React.useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask();
  };

  const  completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy); 
  }

  // const showTask = () => {
  //     const rawData = AsyncStorage.getItem(saveTask);
  //     this.setState({ initialData: rawData ? JSON.parse(jsonValue) : {} });
  // }


  return (

    <View style={styles.container}>
      <ScrollView>
      <StatusBar/>
       {/*todays task  */}
       <View style={styles.tasksWrapper}>
         <Text style={styles.sectionTitle}  >Today's tasks 
         <Image
          source={require("./assets/cat.png")}
          style={{width: 50, height: 50}}
        /></Text>
         <View style={styles.items}>
           {/*tasks will go here*/}
           {
             taskItems.map((item, index) => {
               return (
                 <TouchableOpacity key={index} onPress={() =>  completeTask(index)} >
                   <Task text={item} /> 
                 </TouchableOpacity>
               )
             })
           }
         </View>

       </View>
       </ScrollView>

        {/* Write a Task */}
        <KeyboardAvoidingView
        behavior={ Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
        >
          <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={(text) => setTask(text)} />

          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>
                <Ionicons name="md-send-sharp" size={24} color="black"/>
              </Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>         
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  tasksWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF" ,
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 280,

  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    

  },
  addText: {},
});
