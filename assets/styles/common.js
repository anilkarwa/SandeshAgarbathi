import {StyleSheet} from 'react-native';
import colors from '../../config/colors';
import {theme} from '../../config/theme';

const styles = StyleSheet.create({
  textField: {
    marginTop: 18,
    backgroundColor: colors.white,
    fontSize: 14,
  },
  elementBox: {
    marginTop: 10,
  },
  textInput: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    minHeight: 45,
    fontSize: 14,
  },
  label: {
    color: theme.colors.text,
    fontSize: 13,
    marginLeft: 10,
    backgroundColor: '#fff',
    top: 8,
    position: 'relative',
    zIndex: 10,
    alignSelf: 'flex-start',
    paddingLeft: 5,
    paddingRight: 5,
  },
  boderBox: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 5,
  },
  error: {
    color: '#E74C3C',
    fontWeight: '100',
    fontSize: 10,
  },
});

export default styles;
