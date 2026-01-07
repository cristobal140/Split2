import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import Colors from '../../constants/Colors';

// Recibimos la lista completa de participantes para poder elegir uno
function ItemInput({ onAddItem, participants }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    // Estado para saber quién pagó el ítem (por defecto el primero de la lista)
    const [paidBy, setPaidBy] = useState(null);

    // Efecto para marcar al primer participante por defecto cuando se añaden
    useEffect(() => {
        if (participants.length > 0 && !paidBy) {
            setPaidBy(participants[0]);
        }
    }, [participants]);

    const handleSubmit = () => {
        if (name.trim() && parseFloat(price) > 0 && paidBy) {
            // AHORA PASAMOS 3 DATOS: nombre, precio y quién pagó
            onAddItem(name, price, paidBy);
            setName('');
            setPrice('');
        }
    };

    return (
        <View style={styles.mainContainer}>
            {/* 1. Selector de quién pagó (Chips horizontales) */}
            {participants.length > 0 && (
                <View style={styles.payerSection}>
                    <Text style={styles.payerLabel}>¿Quién pagó este ítem?</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.payerScroll}>
                        {participants.map((p, index) => (
                            <TouchableOpacity 
                                key={p.id || p} 
                                style={[
                                    styles.payerChip, 
                                    paidBy === p && styles.payerChipActive
                                ]}
                                onPress={() => setPaidBy(p)}
                            >
                                <Text style={[
                                    styles.chipText, 
                                    paidBy === p && styles.chipTextActive
                                ]}>
                                    {index + 1}. {p.name || p}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}

            {/* 2. Inputs de Nombre y Precio */}
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
                    disabled={participants.length === 0} 
                >
                    <FontAwesome name="plus" size={16} color={Colors.white} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.gray100,
    },
    payerSection: {
        marginBottom: 12,
    },
    payerLabel: {
        fontSize: 12,
        color: Colors.gray600,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    payerScroll: {
        flexDirection: 'row',
    },
    payerChip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: Colors.gray100,
        marginRight: 8,
        borderWidth: 1,
        borderColor: Colors.gray200,
    },
    payerChipActive: {
        backgroundColor: Colors.primary500,
        borderColor: Colors.primary500,
    },
    chipText: {
        fontSize: 12,
        color: Colors.gray700,
    },
    chipTextActive: {
        color: Colors.white,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8, 
    },
    textInput: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: Colors.gray300,
        borderRadius: 6,
        backgroundColor: Colors.white,
    },
    nameInput: {
        flex: 1, 
    },
    priceInput: {
        width: 90, 
        textAlign: 'right',
    },
    addButton: {
        backgroundColor: Colors.primary500,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 6,
    },
});

export default ItemInput;