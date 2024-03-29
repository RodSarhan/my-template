import {type PropsWithChildren} from 'react';
import {View, type ViewProps} from 'react-native';

type VStackProps = ViewProps;

export const HStack: React.FC<PropsWithChildren<VStackProps>> = ({style, ...props}) => {
    return <View style={[{flexDirection: 'row', alignItems: 'center'}, style]} {...props} />;
};
