import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

// --- Componente para simular un Checkbox Nativo ---
const ItemCheckbox = ({ isChecked, onToggle }) => (
    <TouchableOpacity onPress={onToggle} style={checkboxStyles.container}>
        <View style={[checkboxStyles.box, isChecked && checkboxStyles.checkedBox]}>
            {isChecked && (
                <FontAwesome name="check" size={10} color={Colors.white} />
            )}
        </View>
    </TouchableOpacity>
);

const checkboxStyles = StyleSheet.create({
    container: {
        width: 30, // Coincide con el ancho de la columna en ItemHeader
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        height: 16,
        width: 16,
        borderWidth: 1,
        borderColor: Colors.gray300,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedBox: {
        backgroundColor: Colors.primary500,
        borderColor: Colors.primary500,
    }
});


// --- Componente de Fila Principal (ItemRow) ---
function ItemRow({ item, participants, toggleParticipant, removeItem }) {
    // Cálculo replicado del JS original
    const participantCount = item.participants.length;
    const dividedPrice = participantCount > 0 ? (item.price / participantCount).toFixed(2) : '0.00';
    
    // Columnas para celdas flexibles (deben coincidir con ItemHeader.js)
    const fixedFlex = {
        name: 3,
        price: 1.5,
        divided: 1.5,
    };

    return (
        <View style={styles.row}>
            {/* 1. Celda Nombre (Flex 3) */}
            <View style={[styles.cell, { flex: fixedFlex.name, alignItems: 'flex-start' }]}>
                <Text style={styles.text}>{item.name}</Text>
            </View>

            {/* 2. Celda Precio (Flex 1.5) */}
            <View style={[styles.cell, { flex: fixedFlex.price, alignItems: 'flex-start' }]}>
                <Text style={styles.text}>${item.price.toFixed(2)}</Text>
            </View>

            {/* 3. Checkboxes Dinámicos (Columnas individuales) */}
            {participants.map(pName => {
                const isChecked = item.participants.includes(pName);
                
                const handleToggle = () => {
                    toggleParticipant(item.id, pName, !isChecked);
                };

                return (
                    <ItemCheckbox 
                        key={pName}
                        isChecked={isChecked}
                        onToggle={handleToggle}
                    />
                );
            })}

            {/* 4. Celda Precio Dividido (Flex 1.5) */}
            <View style={[styles.cell, { flex: fixedFlex.divided, alignItems: 'flex-start' }]}>
                <Text style={[styles.text, styles.dividedText]}>${dividedPrice}</Text>
            </View>

            {/* 5. Celda Acciones (Eliminar) */}
            <TouchableOpacity 
                onPress={() => removeItem(item.id)}
                style={styles.actionCell}
            >
                <FontAwesome name="trash" size={16} color={Colors.red500} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray100,
        backgroundColor: Colors.white,
    },
    cell: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        color: Colors.gray700,
    },
    dividedText: {
        fontWeight: 'bold',
        color: Colors.gray800,
    },
    actionCell: {
        width: 40, // Coincide con el ancho de la columna de acciones en ItemHeader
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    }
});

export default ItemRow;