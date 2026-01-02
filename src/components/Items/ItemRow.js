import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

// --- Componente para simular un Checkbox Nativo ---
const ItemCheckbox = ({ isChecked, onToggle }) => (
    // CAMBIO: Quitamos el width de aquí y lo ponemos en el View padre de la fila
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        height: 18,
        width: 18,
        borderWidth: 1,
        borderColor: Colors.gray300,
        borderRadius: 4,
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
    const participantCount = item.participants.length;
    const dividedPrice = participantCount > 0 
        ? Math.round(item.price / participantCount).toLocaleString('es-CL') 
        : '0';

    return (
        <View style={styles.row}>
            {/* 1. Celda Nombre: Se mantiene flexible pero con padding */}
            <View style={{ flex: 3, paddingHorizontal: 5, justifyContent: 'center' }}>
                <Text style={styles.text} numberOfLines={1}>{item.name}</Text>
            </View>

            {/* 2. Celda Precio: ANCHO FIJO (80) para que no empuje a los demás */}
            <View style={{ width: 80, paddingHorizontal: 5, justifyContent: 'center' }}>
                <Text style={styles.text}>${Math.round(item.price).toLocaleString('es-CL')}</Text>
            </View>

            {/* 3. Checkboxes: ENVOLTORIO CON ANCHO FIJO (50) */}
            {participants.map((p, index) => {
                const pId = p.id || p; 
                const isChecked = item.participants.includes(pId);
                
                return (
                    <View key={pId} style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <ItemCheckbox 
                            isChecked={isChecked}
                            onToggle={() => toggleParticipant(item.id, pId, !isChecked)}
                        />
                    </View>
                );
            })}

            {/* 4. Celda Precio Dividido: ANCHO FIJO (80) para alineación perfecta */}
            <View style={{ width: 80, paddingHorizontal: 5, justifyContent: 'center' }}>
                <Text style={[styles.text, styles.dividedText]}>${dividedPrice}</Text>
            </View>

            {/* 5. Celda Acciones */}
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
        minHeight: 48, // Un poco más de altura para mejor UX
    },
    text: {
        fontSize: 14,
        color: Colors.gray700,
    },
    dividedText: {
        fontWeight: 'bold',
        color: Colors.gray800,
        textAlign: 'left',
    },
    actionCell: {
        width: 40, 
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ItemRow;