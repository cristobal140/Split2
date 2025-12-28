import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ItemHeader from './ItemHeader';
import ItemRow from './ItemRow';
import Colors from '../../constants/Colors'; // 🚨 Importar Colores

function ItemTable({ items, participants, toggleParticipant, removeItem }) {
    
    // 1. Caso: No hay participantes
    if (participants.length === 0) {
        return (
            <View>
                <Text style={styles.emptyText}>Añade participantes para empezar a crear la lista de compras.</Text>
            </View>
        );
    }
    
    // 2. Caso: Hay participantes pero no hay ítems (Muestra la cabecera + mensaje)
    if (items.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                {/* Muestra el header de la tabla para que se vea la estructura */}
                <ItemHeader participants={participants} /> 
                <Text style={styles.emptyItemText}>No hay ítems añadidos aún. ¡Añade el primero!</Text>
            </View>
        );
    }

    // 3. Caso: Hay ítems y participantes (Renderizado normal de la tabla)
    return (
        <View style={styles.tableContainer}>
            {/* Encabezado Dinámico (simula el <thead>) */}
            <ItemHeader participants={participants} />
            
            {/* Cuerpo de la Tabla (simula el <tbody> y añade scroll) */}
            <ScrollView style={styles.bodyContainer}>
                {items.map(item => (
                    <ItemRow
                        key={item.id}
                        item={item}
                        participants={participants}
                        toggleParticipant={toggleParticipant}
                        removeItem={removeItem}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    tableContainer: {
        borderWidth: 1,
        borderColor: Colors.gray200,
        borderRadius: 8,
        overflow: 'hidden', // Necesario para que el borde se vea bien con el ScrollView
    },
    bodyContainer: {
        // Altura máxima para permitir desplazamiento vertical (ajustable)
        maxHeight: 300, 
    },
    emptyText: {
        color: Colors.gray500,
        textAlign: 'center',
        paddingVertical: 15,
        fontSize: 14,
    },
    emptyItemText: {
        color: Colors.gray500,
        textAlign: 'center',
        padding: 20,
    },
    emptyContainer: {
        borderWidth: 1,
        borderColor: Colors.gray200,
        borderRadius: 8,
        overflow: 'hidden',
    }
});

export default ItemTable;