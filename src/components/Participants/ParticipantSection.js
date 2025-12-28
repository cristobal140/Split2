import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// Asegúrate de tener instalado @expo/vector-icons
import { FontAwesome } from '@expo/vector-icons'; 
import Colors from '../../constants/Colors'

// --- Subcomponente 1: Badge Nativo ---
const ParticipantBadge = ({ name, onRemove }) => (
    // TouchableOpacity simula el hover y es un buen contenedor para botones en móvil
    <TouchableOpacity 
        style={badgeStyles.badge}
        onPress={() => onRemove(name)} // El toque elimina al participante
        activeOpacity={0.7} // Retroalimentación visual al presionar
    >
        <Text style={badgeStyles.badgeText}>{name}</Text>
        {/* Ícono de eliminar (X) */}
        <FontAwesome name="close" size={14} color={Colors.primary500} style={{ marginLeft: 6 }} />
    </TouchableOpacity>
);

const badgeStyles = StyleSheet.create({
    badge: {
        // Replicando participant-badge (bg-primary-100, px-3, py-1, rounded-full)
        backgroundColor: Colors.primary100,
        paddingHorizontal: 12, 
        paddingVertical: 4,    
        borderRadius: 20,      
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8, // Simula gap-2
        marginBottom: 8, // Para wrap
    },
    badgeText: {
        color: Colors.gray700, // Usamos un color oscuro que contraste bien
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
            setInputName(''); // Limpiar input después de agregar
        }
    };

    const handleClear = () => {
        // Usa Alert de React Native para la confirmación (más nativo)
        Alert.alert(
            "Limpiar Participantes",
            "¿Estás seguro de que quieres eliminar a todos los participantes y sus ítems?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Sí, Limpiar", onPress: clearParticipants, style: "destructive" }
            ]
        );
    };
    
    // Función de ayuda para la interfaz
    const getIconColor = (isPrimary) => isPrimary ? Colors.white : Colors.gray700;

    return (
        <View>
            {/* Título de la Sección (Reemplaza el <h2>) */}
            <View style={sectionStyles.header}>
                <FontAwesome name="users" size={20} color={Colors.gray800} style={{ marginRight: 8 }} />
                <Text style={sectionStyles.headerText}>Participantes</Text>
            </View>
            
            {/* Contenedor de Badges (flex flex-wrap gap-2) */}
            <View style={sectionStyles.badgesContainer}>
                {participants.length === 0 ? (
                    <Text style={sectionStyles.emptyText}>Añade tu primer participante</Text>
                ) : (
                    participants.map(name => (
                        <ParticipantBadge 
                            key={name} 
                            name={name} 
                            onRemove={removeParticipant} 
                        />
                    ))
                )}
            </View>

            {/* Formulario de Input (flex gap-2) */}
            <View style={sectionStyles.inputRow}>
                <TextInput 
                    placeholder="Nombre del participante" 
                    value={inputName}
                    onChangeText={setInputName}
                    onSubmitEditing={handleAdd} // Permite añadir al presionar Enter en el teclado móvil
                    style={sectionStyles.textInput}
                    editable={participants.length < maxParticipants} // Bloquear input si se supera el límite
                />
                
                {/* Botón Añadir */}
                <TouchableOpacity 
                    onPress={handleAdd}
                    style={[sectionStyles.buttonBase, sectionStyles.primaryButton]}
                    disabled={!inputName.trim() || participants.length >= maxParticipants}
                >
                    <FontAwesome name="plus" size={14} color={getIconColor(true)} />
                    {/* Opcional: mostrar solo el icono si el espacio es limitado */}
                </TouchableOpacity>
                
                {/* Botón Limpiar */}
                <TouchableOpacity 
                    onPress={handleClear}
                    style={[sectionStyles.buttonBase, sectionStyles.secondaryButton]}
                    disabled={participants.length === 0}
                >
                    <FontAwesome name="trash" size={14} color={getIconColor(false)} />
                </TouchableOpacity>
            </View>
            
            {/* Mensaje de error (Replicando la lógica de hidden/visible del JS original) */}
            {participants.length >= maxParticipants && (
                <Text style={sectionStyles.errorText}>Máximo {maxParticipants} participantes permitidos</Text>
            )}
        </View>
    );
}

// 3. Estilos de la Sección (Traduciendo el HTML/Tailwind)
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
        marginBottom: 16, // mb-4
        minHeight: 30, // Asegura que el contenedor tenga una altura mínima
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