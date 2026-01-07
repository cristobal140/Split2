// src/components/Items/ItemHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

function ItemHeader({ participants }) {
    const fixedHeaders = [
        { key: 'item', label: 'Ítem', flex: 3 },
        { key: 'price', label: 'Precio', flex: 1.5 },
        // AÑADIMOS: Columna para el pagador
        { key: 'paidBy', label: 'Pagó', width: 60 }, 
    ];
    const fixedFooters = [
        { key: 'divided', label: 'Dividido', flex: 1.5 },
        { key: 'actions', label: 'Acciones', width: 40 },
    ];

    return (
        <View style={styles.headerRow}>
            {/* Encabezados Fijos Izquierda (Ítem, Precio y Pagó) */}
            {fixedHeaders.map(col => (
                <View 
                    key={col.key} 
                    style={[
                        styles.headerCell, 
                        col.width ? { width: col.width } : { flex: col.flex },
                        // Centramos la etiqueta "Pagó" para que se vea mejor
                        col.key === 'paidBy' && { alignItems: 'center' }
                    ]}
                >
                    <Text style={styles.headerText}>{col.label}</Text>
                </View>
            ))}

            {/* Encabezados Numéricos Dinámicos (Participantes) */}
            {participants.map((_, index) => (
                <View 
                    key={index} 
                    style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}
                >
                    <Text style={styles.participantText}>{index + 1}</Text> 
                </View>
            ))}

            {/* Encabezados Fijos Derecha (Dividido y Acciones) */}
            {fixedFooters.map(col => (
                <View 
                    key={col.key} 
                    style={[styles.headerCell, col.width ? { width: col.width } : { flex: col.flex }]}
                >
                    <Text style={styles.headerText}>{col.label}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        backgroundColor: Colors.gray100, 
        paddingVertical: 10, 
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray300,
        minWidth: '100%', 
    },
    headerCell: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 5,
    },
    headerText: {
        fontSize: 11, // Reducimos un poco para que quepan más columnas
        color: Colors.gray700,
        fontWeight: 'bold',
    },
    participantText: {
        fontSize: 12,
        color: Colors.blue600,
        fontWeight: 'bold',
    }
});

export default ItemHeader;