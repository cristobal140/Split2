import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ItemHeader from './ItemHeader';
import ItemRow from './ItemRow';
import Colors from '../../constants/Colors';

function ItemTable({ items, participants, toggleParticipant, removeItem }) {
    
    // 1. Caso: No hay participantes
    if (participants.length === 0) {
        return (
            <View>
                <Text style={styles.emptyText}>Añade participantes para empezar a crear la lista de compras.</Text>
            </View>
        );
    }
    
    const renderTableContent = () => {
        // 2. Caso: Hay participantes pero no hay ítems
        if (items.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    {/* Scroll horizontal preventivo por si la lista de números es muy larga */}
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <ItemHeader participants={participants} /> 
                    </ScrollView>
                    <Text style={styles.emptyItemText}>No hay ítems añadidos aún. ¡Añade el primero!</Text>
                </View>
            );
        }
    
        // 3. Caso: Hay ítems y participantes (Versión optimizada para números)
        return (
            <View style={styles.tableContainer}>
                {/* Envolvemos en un solo ScrollView horizontal. 
                    Si hay pocos participantes, no hará nada. 
                    Si hay muchos, permitirá deslizar. */}
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View>
                        {/* Un solo Header alineado con las columnas de abajo */}
                        <ItemHeader participants={participants} />
                        
                        {/* Cuerpo con scroll vertical */}
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
                </ScrollView>
            </View>
        );
    };

    return renderTableContent();    
}

const styles = StyleSheet.create({
    tableContainer: {
        borderWidth: 1,
        borderColor: Colors.gray200,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff', 
    },
    bodyContainer: {
        // Altura máxima para permitir desplazamiento vertical
        maxHeight: 500, 
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