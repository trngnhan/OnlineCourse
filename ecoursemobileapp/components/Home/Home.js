import MyStyles from "../../styles/MyStyles";
import { useEffect, useState } from "react";
import { FlatList, Image, Text,TouchableOpacity,View } from "react-native";
import { ActivityIndicator, Chip, List, Searchbar } from "react-native-paper";
import Apis, { endpoints } from "../../configs/Apis";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const [categories, setCategories]=useState([]);
    const [courses, setCourses]=useState([]);
    const [loading, setLoading]=useState(false);
    const [page, setPage]=useState(1);
    const [q, setQ]=useState([]);
    const [cateId, setCateId] = useState(null);
    const nav = useNavigation();


    const loadCates=async () => {
        let res = await Apis.get(endpoints['categories'])
        setCategories(res.data);
    }

    const loadCourses = async() => {
        if (page > 0) {
            try {

                setLoading(true);
                 
                let url =  `${endpoints['courses']}?page=${page}`;
    
                if (q) {
                    url = `${url}&q=${q}`;
                }
    
                if (cateId) {
                    url = `${url}&category_id=${cateId}`;
                }
    
                let res = await Apis.get(url);
    
                setCourses([...courses, ...res.data.results]);
    
                if (res.next === null) {
                    setPage(0);
                }
    
            } catch {
                //...
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(()=>{
        loadCates();
    },[]);

    useEffect(()=>{
        let timer =setTimeout(()=> {
            loadCourses();
        },500);
        return ()=> clearTimeout(timer)
    },[q, page, cateId]);

    const loadMore = () => {
        if (!loading && page > 0) {
            setPage(page + 1);
        }
    }

    const search = (value, callback) => {
        setPage(1);
        setCourses([]);
        callback(value);
    }

    return (
        <SafeAreaView style={[MyStyles.container, MyStyles.padding]}>
            <Text style={MyStyles.subject}>DANH SÁCH KHOÁ HỌC</Text>
            <View style={[MyStyles.row, MyStyles.wrap]}>
                
                <TouchableOpacity onPress={() => setCateId(null)}>
                    <Chip icon="label" style={MyStyles.margin}>Tất cả</Chip>
                </TouchableOpacity>

                {categories.map(c => 
                <TouchableOpacity key={c.id} onPress={() => setCateId(c.id)}>
                    <Chip icon="label" style={MyStyles.margin}>{c.name}</Chip>
                </TouchableOpacity>)}
            </View>

            <Searchbar
                placeholder="Tìm kiếm khóa học..."
                onChangeText={setQ}
                value={q}
            />
            

            <FlatList onEndReached={loadMore} ListFooterComponent={loading && <ActivityIndicator/>} data={courses} renderItem={({item})=><List.Item title={item.subject} 
                description={item.created_date} left ={()=> <TouchableOpacity onPress={() => nav.navigate('lesson', {"courseId": item.id})}><Image style ={MyStyles.avatar} source={{uri: item.image}}/></TouchableOpacity>}/>}/>
        </SafeAreaView>
    );
}
export default Home;