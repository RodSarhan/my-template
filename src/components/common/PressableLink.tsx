import {Link, LinkComponent, type LinkProps} from 'expo-router';
import {Pressable, PressableProps} from 'react-native';

type PressableLinkProps<T> = Omit<React.PropsWithChildren<LinkProps<T>>, keyof PressableProps> &
    PressableProps;

export const PressableLink = <T,>(props: PressableLinkProps<T>) => {
    //@ts-expect-error
    return <Link {...props} asChild />;
};
