// src/components/Items/ItemHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

function ItemHeader({ participants }) {
    const fixedHeaders = [
        { key: 'item', label: 'Ítem', flex: 3 },
        { key: 'price', label: 'Precio', flex: 1.5 },
    ];
    const fixedFooters = [
        { key: 'divided', label: 'Dividido', flex: 1.5 },
        { key: 'actions', label: 'Acciones', width: 40 },
    ];

    return (
        <View style={styles.headerRow}>
            {/* Encabezados Fijos Izquierda (Ítem y Precio) */}
            {fixedHeaders.map(col => (
                <View key={col.key} style={[styles.headerCell, { flex: col.flex }]}>
                    <Text style={styles.headerText}>{col.label}</Text>
                </View>
            ))}

            {/* OPCIÓN 2: Encabezados Numéricos Dinámicos */}
            {participants.map((_, index) => (
                <View 
                    key={index} 
                    style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}
                >
                    {/* Mostramos el índice + 1 para que empiece desde el 1 */}
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
        // Asegura que el header tenga el mismo fondo para que no se vea transparente
        minWidth: '100%', 
    },
    headerCell: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 5,
    },
    headerText: {
        fontSize: 12,
        color: Colors.gray700,
        fontWeight: 'bold',
    },
    participantCell: {
        // Ajustamos el ancho a 45 para que sea cómodo de tocar y leer
        width: 45, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    participantText: {
        fontSize: 12,
        color: Colors.blue600, // Color azul para resaltar que es un número de participante
        fontWeight: 'bold',
    }
});

export default ItemHeader;