import React, { useState } from 'react' 
import { Alert, StyleSheet, View, Text, ScrollView } from 'react-native' 
import { Input, Button } from '@rneui/themed' 
import { supabase } from '../lib/supabase'  

export default function Auth() {   
  const [email, setEmail] = useState('')   
  const [password, setPassword] = useState('')   
  const [loading, setLoading] = useState(false)    
  
  const handleSignIn = async () => {     
    setLoading(true)     
    const { error } = await supabase.auth.signInWithPassword({ email, password })     
    if (error) Alert.alert('Sign in error', error.message)     
    setLoading(false)   
  }    
  
  const handleSignUp = async () => {     
    setLoading(true)     
    const { error, data } = await supabase.auth.signUp({ email, password })     
    if (error) Alert.alert('Sign up error', error.message)     
    if (!data.session) {       
      Alert.alert('Success', 'Please check your email for verification')     
    }     
    setLoading(false)   
  }    
  
  return (     
    <ScrollView contentContainerStyle={styles.container}>       
      {/* Sign in text at top right */}       
      <View style={styles.topBar}>         
        <Text style={styles.signInText} onPress={handleSignIn}>Sign in</Text>       
      </View>              
      
      <View style={styles.formContent}>         
        <View style={styles.headerContainer}>           
          <Text style={styles.header}>Enter a password</Text>           
          <Text style={styles.subHeader}>Create a free account to start watching.</Text>         
        </View>        
        
        <Input         
          placeholder="email@address.com"         
          label="Email"         
          labelStyle={styles.labelStyle}         
          leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#888', size: 18 }}         
          autoCapitalize="none"         
          value={email}         
          onChangeText={setEmail}         
          containerStyle={styles.inputContainer}         
          inputContainerStyle={styles.inputContainerStyle}       
        />              
        
        <Input         
          placeholder="Password"         
          label="Password"         
          labelStyle={styles.labelStyle}         
          leftIcon={{ type: 'font-awesome', name: 'lock', color: '#888', size: 18 }}         
          secureTextEntry         
          autoCapitalize="none"         
          value={password}         
          onChangeText={setPassword}         
          containerStyle={styles.inputContainer}         
          inputContainerStyle={styles.inputContainerStyle}       
        />        
        
        {/* Only Sign Up button visible */}       
        <Button         
          title="Sign up"         
          loading={loading}         
          onPress={handleSignUp}         
          buttonStyle={styles.signUpButton}         
          containerStyle={styles.buttonContainer}       
        />       
      </View>     
    </ScrollView>   
  ) 
}  

const styles = StyleSheet.create({   
  container: {     
    flexGrow: 1,     
    backgroundColor: '#fff',     
    paddingTop: 130,     
    justifyContent: 'flex-end', // Position content towards bottom     
    paddingBottom: 60, // Add padding at bottom   
  },   
  topBar: {     
    position: 'absolute',     
    top: 60,     
    right: 20,     
    zIndex: 1,   
  },   
  signInText: {     
    color: '#2196F3',     
    fontSize: 16,     
    fontWeight: '500',   
  },   
  formContent: {     
    width: '100%',     
    paddingTop: 100, // Add more space at the top to push content down
  },   
  headerContainer: {     
    paddingHorizontal: 20,     
    marginBottom: 40,
    alignItems: 'center', // Center header content horizontally
  },   
  header: {     
    fontSize: 28,     
    fontWeight: 'bold',     
    marginBottom: 10,
    textAlign: 'center', // Center text alignment     
  },   
  subHeader: {     
    fontSize: 16,     
    color: '#555',
    textAlign: 'center', // Center text alignment     
  },   
  labelStyle: {     
    color: '#888',     
    fontSize: 14,     
    fontWeight: 'normal',     
    marginBottom: 5,
  },   
  inputContainer: {     
    paddingHorizontal: 30,     
    marginBottom: 15,
  },   
  inputContainerStyle: {     
    borderBottomWidth: 1,     
    borderBottomColor: '#ddd',
  },   
  buttonContainer: {     
    paddingHorizontal: 30,     
    marginTop: 10,
  },   
  signUpButton: {     
    backgroundColor: '#2196F3',     
    paddingVertical: 12,     
    borderRadius: 4,   
  } 
})