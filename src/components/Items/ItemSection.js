// src/components/Items/ItemSection.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors'; 
import ItemTable from './ItemTable'; 
import ItemInput from './ItemInput'; 


function ItemSection({ items, participants, addItem, removeItem, toggleParticipant }) {
     
    // Obtiene el color de texto gris oscuro (gray800)
    // Usamos el objeto Colors que importamos
    const gray800 = Colors.gray800; 

    return (
        <View>
            {/* Título de la Sección */}
            <View style={styles.header}>
                <FontAwesome name="shopping-cart" size={20} color={gray800} style={{ marginRight: 8 }} />
                <Text style={styles.headerText}>Lista de compras</Text>
            </View>

            {/* La tabla (Visualización de ítems) */}
            <View style={styles.tableWrapper}>
                <ItemTable 
                    items={items} 
                    participants={participants} 
                    toggleParticipant={toggleParticipant}
                    removeItem={removeItem}
                />
            </View>
            
            {/* Formulario de Adición (Input) */}
            <ItemInput 
                onAddItem={addItem} 
                participantsCount={participants.length}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16, // mb-4
    },
    headerText: {
        fontSize: 18, // text-xl
        fontWeight: '600',
        color: Colors.gray800,
    },
    tableWrapper: {
        marginBottom: 8,
    }
});

export default ItemSection;