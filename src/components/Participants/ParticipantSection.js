import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import Colors from '../../constants/Colors'

// --- Subcomponente 1: Badge Nativo (Editado para mostrar número) ---
const ParticipantBadge = ({ name, index, onRemove }) => (
    <TouchableOpacity 
        style={badgeStyles.badge}
        onPress={() => onRemove(name)}
        activeOpacity={0.7}
    >
        {/* Mostramos el número de orden resaltado */}
        <View style={badgeStyles.numberCircle}>
            <Text style={badgeStyles.numberText}>{index + 1}</Text>
        </View>
        
        <Text style={badgeStyles.badgeText}>{name}</Text>
        
        <FontAwesome name="close" size={14} color={Colors.primary500} style={{ marginLeft: 6 }} />
    </TouchableOpacity>
);

const badgeStyles = StyleSheet.create({
    badge: {
        backgroundColor: Colors.primary100,
        paddingLeft: 6, // Reducido para que el círculo numérico quede bien
        paddingRight: 12, 
        paddingVertical: 4,    
        borderRadius: 20,      
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8, 
        marginBottom: 8, 
    },
    numberCircle: {
        backgroundColor: Colors.primary500,
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },
    numberText: {
        color: Colors.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
    badgeText: {
        color: Colors.gray700, 
        fontSize: 14,
        fontWeight: '500',
    },
});


// --- Componente Principal ---
function ParticipantSection({ participants, addParticipant, removeParticipant, clearParticipants }) {
    const [inputName, setInputName] = useState('');
    const maxParticipants = 20;

    const handleAdd = () => {
        if (inputName.trim()) {
            addParticipant(inputName);
            setInputName('');
        }
    };

    const handleClear = () => {
        Alert.alert(
            "Limpiar Participantes",
            "¿Estás seguro de que quieres eliminar a todos los participantes y sus ítems?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Sí, Limpiar", onPress: clearParticipants, style: "destructive" }
            ]
        );
    };
    
    const getIconColor = (isPrimary) => isPrimary ? Colors.white : Colors.gray700;

    return (
        <View>
            <View style={sectionStyles.header}>
                <FontAwesome name="users" size={20} color={Colors.gray800} style={{ marginRight: 8 }} />
                <Text style={sectionStyles.headerText}>Participantes</Text>
            </View>
            
            <View style={sectionStyles.badgesContainer}>
                {participants.length === 0 ? (
                    <Text style={sectionStyles.emptyText}>Añade tu primer participante</Text>
                ) : (
                    // CAMBIO: Usamos el segundo argumento del map (index)
                    participants.map((name, index) => (
                        <ParticipantBadge 
                            key={name} 
                            name={name} 
                            index={index} // Pasamos la posición
                            onRemove={removeParticipant} 
                        />
                    ))
                )}
            </View>

            <View style={sectionStyles.inputRow}>
                <TextInput 
                    placeholder="Nombre del participante" 
                    value={inputName}
                    onChangeText={setInputName}
                    onSubmitEditing={handleAdd}
                    style={sectionStyles.textInput}
                    editable={participants.length < maxParticipants}
                />
                
                <TouchableOpacity 
                    onPress={handleAdd}
                    style={[sectionStyles.buttonBase, sectionStyles.primaryButton]}
                    disabled={!inputName.trim() || participants.length >= maxParticipants}
                >
                    <FontAwesome name="plus" size={14} color={getIconColor(true)} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                    onPress={handleClear}
                    style={[sectionStyles.buttonBase, sectionStyles.secondaryButton]}
                    disabled={participants.length === 0}
                >
                    <FontAwesome name="trash" size={14} color={getIconColor(false)} />
                </TouchableOpacity>
            </View>
            
            {participants.length >= maxParticipants && (
                <Text style={sectionStyles.errorText}>Máximo {maxParticipants} participantes permitidos</Text>
            )}
        </View>
    );
}

const sectionStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 18, 
        fontWeight: '600',
        color: Colors.gray800,
    },
    badgesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16, 
        minHeight: 30,
    },
    emptyText: {
        color: Colors.gray500,
        fontStyle: 'italic',
        fontSize: 14,
    },
    inputRow: {
        flexDirection: 'row',
        gap: 8, 
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: Colors.gray300,
        borderRadius: 6,
    },
    buttonBase: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12, 
        paddingVertical: 8,    
        borderRadius: 6,       
    },
    primaryButton: {
        backgroundColor: Colors.primary500,
    },
    secondaryButton: {
        backgroundColor: Colors.gray200,
    },
    errorText: {
        color: Colors.red500,
        marginTop: 8,
    }
});

export default ParticipantSection;