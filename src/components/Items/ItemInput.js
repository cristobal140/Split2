// src/components/Items/ItemInput.js

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import Colors from '../../constants/Colors'; // Subir dos niveles

function ItemInput({ onAddItem, participantsCount }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = () => {
        // Validación básica (App.js hace la validación final)
        if (name.trim() && parseFloat(price) > 0 && participantsCount > 0) {
            onAddItem(name, price);
            setName('');
            setPrice('');
        }
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput 
                placeholder="Nombre del ítem" 
                value={name}
                onChangeText={setName}
                style={[styles.textInput, styles.nameInput]}
                onSubmitEditing={handleSubmit}
            />
            <TextInput 
                placeholder="Precio" 
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric" 
                style={[styles.textInput, styles.priceInput]}
                onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity 
                onPress={handleSubmit}
                style={styles.addButton}
                disabled={participantsCount === 0} 
            >
                <FontAwesome name="plus" size={16} color={Colors.white} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8, 
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.gray100,
    },
    textInput: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: Colors.gray300,
        borderRadius: 6,
    },
    nameInput: {
        flex: 1, 
    },
    priceInput: {
        width: 80, 
        textAlign: 'right',
    },
    addButton: {
        backgroundColor: Colors.primary500,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
});

export default ItemInput;