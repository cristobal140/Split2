import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

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
    container: { alignItems: 'center', justifyContent: 'center' },
    box: {
        height: 18, width: 18,
        borderWidth: 1, borderColor: Colors.gray300,
        borderRadius: 4, alignItems: 'center', justifyContent: 'center',
    },
    checkedBox: { backgroundColor: Colors.primary500, borderColor: Colors.primary500 }
});

function ItemRow({ item, participants, toggleParticipant, removeItem, updateItemPaidBy, updateItemPrice }) {
    const participantCount = item.participants.length;
    const dividedPrice = participantCount > 0 
        ? Math.round(item.price / participantCount).toLocaleString('es-CL') 
        : '0';

    const handleRotatePayer = () => {
        const currentIndex = participants.indexOf(item.paidBy);
        const nextIndex = (currentIndex + 1) % participants.length;
        updateItemPaidBy(item.id, participants[nextIndex]);
    };

    return (
        <View style={styles.row}>
            {/* 1. Nombre */}
            <View style={{ flex: 3, paddingHorizontal: 5, justifyContent: 'center' }}>
                <Text style={styles.text} numberOfLines={1}>{item.name}</Text>
            </View>

            {/* 2. Precio */}
            <View style={{ width: 80, paddingHorizontal: 5, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.text}>$</Text>
                <TextInput
                    style={[styles.text, styles.priceInput]}
                    defaultValue={Math.round(item.price).toString()}
                    keyboardType="numeric"
                    onEndEditing={(e) => {
                        updateItemPrice(item.id, e.nativeEvent.text);
                    }}
                    selectTextOnFocus
                />
            </View>

            {/* Selector de Pagador */}
            <TouchableOpacity onPress={handleRotatePayer} style={styles.payerCell} activeOpacity={0.6}>
                <View style={styles.payerBadge}>
                    <Text style={styles.payerBadgeText}>{participants.indexOf(item.paidBy) + 1}</Text>
                </View>
                <FontAwesome name="refresh" size={8} color={Colors.gray400} style={styles.refreshIcon} />
            </TouchableOpacity>

            {/* Checkboxes */}
            {participants.map((p, index) => {
                const pId = p.id || p; 
                const isChecked = item.participants.includes(pId);
                return (
                    <View key={pId} style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <ItemCheckbox isChecked={isChecked} onToggle={() => toggleParticipant(item.id, pId, !isChecked)} />
                    </View>
                );
            })}

            {/* Precio Dividido */}
            <View style={{ width: 80, paddingHorizontal: 5, justifyContent: 'center' }}>
                <Text style={[styles.text, styles.dividedText]}>${dividedPrice}</Text>
            </View>

            {/* Eliminar */}
            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.actionCell}>
                <FontAwesome name="trash" size={16} color={Colors.red500} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row', alignItems: 'center',
        borderBottomWidth: 1, borderBottomColor: Colors.gray100,
        backgroundColor: Colors.white, minHeight: 48,
    },
    text: { fontSize: 14, color: Colors.gray700 },
    dividedText: { fontWeight: 'bold', color: Colors.gray800 },
    priceInput: { flex: 1, padding: 0, margin: 0 },
    actionCell: { width: 40, alignItems: 'center', justifyContent: 'center' },
    payerCell: { width: 60, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
    payerBadge: {
        backgroundColor: Colors.gray100, width: 26, height: 26, borderRadius: 13,
        alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.gray300,
    },
    payerBadgeText: { fontSize: 12, fontWeight: 'bold', color: Colors.primary600 },
    refreshIcon: { position: 'absolute', bottom: 4, right: 10 }
});

export default ItemRow;