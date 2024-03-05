import {
  Text,
  View,
  Alert,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import {bg} from '../../assets';
import {API_URL} from '../../constant';
import {Fonts} from '../../utils/Fonts';
import {scale} from '../../utils/Matrix';
import {Colors} from '../../utils/Colors';
import CInput from '../../component/CInput';
import CLoader from '../../component/CLoader';
import Toast from 'react-native-toast-message';
import React, {useEffect, useState} from 'react';
import CDropdown from '../../component/CDropdown';
import {getData} from '../../component/CommonStorage';
import CDatePicker from '../../component/CDatePicker';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddProject = () => {
  const navigation = useNavigation();

  useEffect(() => {
    getAllEmp();
  }, []);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [endDate, setEndDate] = useState(null);
  const [empList, setEmpList] = useState([]);
  const [assignTo, setAssignTo] = useState('');

  const [selectedFiles, setSelectedFiles] = useState([]);

  const typeData = [
    {
      label: 'web development',
      value: 'web development',
    },
    {
      label: 'app developmet',
      value: 'app developmet',
    },
    {
      label: 'web design',
      value: 'web design',
    },
    {
      label: 'ui/ux',
      value: 'ui/ux',
    },
    {
      label: 'backend development',
      value: 'backend development',
    },
    {
      label: 'testing',
      value: 'testing',
    },
    {
      label: 'publishing',
      value: 'publishing',
    },
  ];

  const statusData = [
    {label: 'upcoming', value: 'upcoming'},
    {label: 'process', value: 'process'},
    {label: 'completed', value: 'completed'},
  ];

  const priorityData = [
    // Highest, High, Medium, Low, Lowest
    {label: 'Highest', value: 'Highest'},
    {label: 'High', value: 'High'},
    {label: 'Medium', value: 'Medium'},
    {label: 'Low', value: 'Low'},
    {label: 'Lowest', value: 'Lowest'},
  ];

  const onCreateProject = async () => {
    console.log(selectedFiles, 'selectedFiles>>>>>>>>>>>>>>>>');

    if (
      name == '' ||
      description == '' ||
      type == '' ||
      status == '' ||
      priority == '' ||
      endDate == null
    ) {
      Alert.alert('Warning', 'please fill all fileds');
      return;
    }
    setLoading(true);

    const createdDate = moment(new Date()).format('ll');
    const deadlineDate = moment(endDate).format('ll');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('createdDate', createdDate);
    formData.append('deadlineDate', deadlineDate);
    formData.append('status', status);
    formData.append('type', type);
    formData.append('priority', priority);
    formData.append('assignTo', assignTo);

    selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    const storedData = await getData('userAuth');
    const token = storedData?.token;

    await axios
      .post(`${API_URL}/createproject`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      })
      .then(res => {
        Toast.show({
          type: 'success',
          text2: 'Project created successfully',
        });
        console.log(res.data, 'res');
        setLoading(false);
        navigation.goBack();
      })
      .catch(err => {
        console.log(err,"errr");
        setLoading(false);
      });
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: [DocumentPicker.types.allFiles],
      });
      console.log(res, 'res');
      setSelectedFiles(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Error occurred:', err);
      }
    }
  };

  const getAllEmp = async () => {
    const storedData = await getData('userAuth');
    const token = storedData?.token;

    await axios
      .get(`${API_URL}/employeesName`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then(res => {
        setEmpList(res.data.employees);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderFiles = ({item, index}) => {
    return (
      <TouchableOpacity key={index} style={styles.fileView}>
        <Text numberOfLines={1}>Name : {item.name}</Text>
        <Text>size : {item.size}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={bg} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}>
          <AntDesign name={'left'} size={scale(18)} color={Colors.white} />
          <Text style={styles.backTxt}>Project Details</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{marginTop: scale(12)}}>
        <CInput
          otherStyle={styles.input}
          label={'Project Name'}
          onChangeText={txt => setName(txt)}
        />

        <CInput
          otherStyle={styles.input}
          label={'Project Description'}
          multiline={true}
          numberOfLines={5}
          onChangeText={txt => setDescription(txt)}
        />

        <CDropdown
          placeholder={'Select Type'}
          label={'Select Type'}
          data={typeData}
          onValueChange={txt => setType(txt)}
        />

        <CDatePicker
          placeholder={'Select Deadline Date'}
          onDateSelect={val => setEndDate(val)}
        />

        <CDropdown
          placeholder={'Select Status'}
          label={'Select Status'}
          data={statusData}
          onValueChange={txt => setStatus(txt)}
        />

        <CDropdown
          placeholder={'Select Priority'}
          label={'Select Priority'}
          data={priorityData}
          onValueChange={txt => setPriority(txt)}
        />

        <CDropdown
          placeholder={'Assign To'}
          label={'Select Employee'}
          data={empList}
          onValueChange={txt => setAssignTo(txt)}
        />

        <View style={{alignSelf: 'center', width: '90%'}}>
          {selectedFiles.length == 0 ? (
            <>
              <Text style={styles.uploadTxt}>Add Files</Text>
              <TouchableOpacity style={styles.plusBtn} onPress={pickDocument}>
                <AntDesign name="plus" color={Colors.white} size={scale(18)} />
              </TouchableOpacity>
            </>
          ) : (
            <FlatList
              data={selectedFiles}
              renderItem={renderFiles}
              keyExtractor={i => i.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <TouchableOpacity style={styles.createBtn} onPress={onCreateProject}>
          <Text style={styles.createBtnTxt}>Create Project</Text>
        </TouchableOpacity>
      </ScrollView>

      <CLoader visible={loading} />
    </ImageBackground>
  );
};

export default AddProject;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: scale(50),
    padding: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.white,
    borderBottomWidth: scale(0.2),
    justifyContent: 'space-between',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backTxt: {
    fontSize: scale(15),
    color: Colors.white,
    marginLeft: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
  input: {
    width: '100%',
  },
  createBtn: {
    width: '90%',
    height: scale(40),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
    justifyContent: 'center',
    backgroundColor: Colors.purple,
    marginVertical: scale(8),
  },
  createBtnTxt: {
    color: Colors.white,
    fontSize: scale(18),
    fontFamily: Fonts.AntaRegular,
  },
  plusBtn: {
    width: scale(40),
    height: scale(40),
    alignItems: 'center',
    borderRadius: scale(5),
    justifyContent: 'center',
    backgroundColor: Colors.grey,
  },
  uploadTxt: {
    fontSize: scale(18),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    marginVertical: scale(8),
  },
  fileView: {
    height: 100,
    width: 100,
    borderRadius: 12,
    backgroundColor: Colors.white,
    margin: 8,
  },
});
