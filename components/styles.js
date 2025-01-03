import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0711b2', // 默认背景色
    paddingTop: 40,
  },
  playerContainer: {
    height: 220,
    marginBottom: 20,
    backgroundColor: '#0711b2',
    borderRadius: 10,
    overflow: 'hidden',
  },
  stationName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 0,
    color: '#fff',
  },
  webView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  groupContainer: {
    flex: 1,
    width, // 每组宽度与屏幕宽度相等
    paddingTop: 10,
  },
  radioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  radioItem: {
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
  },
  radioImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
	backgroundColor: 'transparent',
  },
  radioName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  playButton: {
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
	aboutButton: {
	  position: 'absolute',
	  top: 5,
	  right: 10,
	  padding: 8, // 确保图标周围有适当的点击区域
      zIndex: 1,	  
	  backgroundColor: 'transparent', // 如果需要背景，可以设置颜色
	},

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#000', // 黑色背景
    padding: 20,
    borderRadius: 10,
  },
  avatar: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff' // 白色字体
  },
  modalText: {
    fontSize: 16,
    marginTop: 5,
    color: '#fff' // 白色字体
  },
  activeIndicator: {
    backgroundColor: '#0711b2',
  },
/*  
  sleepTimerButton: {
    position: 'absolute',
    top: 13,
    right: 70, // 调整位置以避免与其他按钮重叠
    zIndex: 1,
  },
  
  addStationButton: {
    position: 'absolute',
    top: 10,
    right: 40,
    zIndex: 1,
  },  // 添加了缺失的括号
  timerText: {
  //textStyle: {
    position: 'absolute',  
    fontSize: 16,
    //textAlign: 'center',
    left: 90, // 调整位置以避免与其他按钮重叠	
    marginVertical: 10,
    zIndex: 1,
    fontWeight: 'bold', // 设置文本为粗体
  },
*/  
});
