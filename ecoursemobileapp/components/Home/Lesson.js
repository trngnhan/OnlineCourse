import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { useEffect, useState } from "react";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Apis, { endpoints } from "../../configs/Apis";

const Lessons = ({route}) => {
    const courseId = route.params?.courseId;
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(false);
    const nav = useNavigation();

    const loadLessons = async () => {
        try {
            setLoading(true);

            let res = await Apis.get(endpoints['lessons'](courseId));
            setLessons(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
            
    }

    useEffect(() => {
        loadLessons();
    }, [courseId]);

    return (
        <View>
            <FlatList ListFooterComponent={loading && <ActivityIndicator size={30} />} 
                                data={lessons} renderItem={({item}) => <List.Item key={`Lesson${item.id}`} title={item.subject} description={item.created_date} 
                                                left={() => <TouchableOpacity onPress={() => nav.navigate('lessons', {'courseId': item.id})}>
                                                    <Image style={MyStyles.avatar} source={{uri: item.image}} />
                                                </TouchableOpacity>} />} />
        </View>
    );
}

export default Lessons;