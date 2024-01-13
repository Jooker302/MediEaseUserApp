import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
}

function CustomButton({ title, onPress }: CustomButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button]}>
      <Text style={[styles.buttonText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    color: '#04b1b2',
    marginBottom: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#04b1b2',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default CustomButton;
