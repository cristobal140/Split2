// src/components/Items/ItemHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors'; // Subir dos niveles

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
            {/* Encabezados Fijos Izquierda */}
            {fixedHeaders.map(col => (
                <View key={col.key} style={[styles.headerCell, { flex: col.flex }]}>
                    <Text style={styles.headerText}>{col.label}</Text>
                </View>
            ))}

            {/* Encabezados de Participantes Dinámicos */}
            {participants.map(name => (
                <View key={name} style={styles.participantCell}>
                    <Text style={styles.participantText}>{name.charAt(0)}</Text> 
                </View>
            ))}

            {/* Encabezados Fijos Derecha */}
            {fixedFooters.map(col => (
                <View key={col.key} style={[styles.headerCell, col.width ? { width: col.width } : { flex: col.flex }]}>
                    <Text style={styles.headerText}>{col.label}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        backgroundColor: Colors.gray100, // bg-gray-50
        paddingVertical: 10, 
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray300,
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
        width: 30, // Simulación de checkbox-cell
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 2,
    },
    participantText: {
        fontSize: 12,
        color: Colors.gray700,
        fontWeight: 'bold',
    }
});

export default ItemHeader;