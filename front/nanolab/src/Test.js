import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Test = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>My WebView</title>
    </head>
    <body>
        <div style="font-family: noto sans;">
	        <p style="font-family: noto sans;">
	            <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">
		            <a href="http://int.kku.ac.kr" title="국제교육원" target="_blank" style="font-family: noto sans;"><i style="font-family: noto sans;">국제교류 관련 공지는 대외협력처 국제교육원 홈페이지</i></a>
                    를 참고하시기 바랍니다.
                </span>
	        </p>
	        <p style="text-autospace: none; letter-spacing: -0.7pt; font-size: 6.0pt; font-family: noto sans;">  <!--[if !supportEmptyParas]-->&nbsp;<!--[endif]-->  </p>
	        <p style="font-family: noto sans;">
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">
			        <a href="http://int.kku.ac.kr" title="국제교육원" target="_blank" style="font-family: noto sans;"><i style="font-family: noto sans;">대외협력처 국제교육원 홈페이지(http://int.kku.ac.kr)</i></a>
		        </span>
		    <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">를 방문하시면 </span>
		    <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">①</span>
		    <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">해외파견</span>	
		    <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">(</span>
		    <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">국제화</span>
		    <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">)</span>
		    <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">프로그램</span>
		    <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">, </span>
		    <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">②</span>
		    <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">외국어교육</span>
		    <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">, </span>
		    <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">③</span>
		    <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">유학생입학</span>
		    <span style="letter-spacing: -0.7pt; font-size: 13.0pt; font-family: noto sans;"> </span><span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">등에 관한 정보를 다양하게 얻으실 수 있습니다</span>
		    <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">.</span></p>
	        <p style="text-autospace: none; letter-spacing: -0.7pt; font-size: 6.0pt; font-family: noto sans;">  <!--[if !supportEmptyParas]-->&nbsp;<!--[endif]-->  </p>
	        <div id="hwpEditorBoardContent" class="hwp_editor_board_content" data-hjsonver="1.0" data-jsonlen="11011" style="font-family: noto sans;"></div>
	        <p style="text-autospace: none; font-family: noto sans;">
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">대외협력처 국제교육원 홈페이지를 방문하시고 다양한 해외파견프로그램 등과 함께 다채로운 대학생활을 느껴보시길 바랍니다.</span></p>
	        <p style="text-autospace: none; letter-spacing: -0.7pt; font-size: 12.0pt; font-family: noto sans;"><br style="font-family: noto sans;"></p>
	        <p style="text-autospace: none; letter-spacing: -0.7pt; font-size: 12.0pt; font-family: noto sans;">-------</p>
	        <p style="font-family: noto sans;">
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">
			        <a href="http://int.kku.ac.kr" title="Institute of International Education" target="_blank" style="font-family: noto sans;"><b style="font-family: noto sans;">If you want to get the information about below, please visit the website of 'Institute of International Education' (http://int.kku.ac.kr)</b></a>
		        </span>
	        </p>
	        <p style="font-family: noto sans;">
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">&nbsp; ① </span>
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">International exchange programs</span>
		        <span style="letter-spacing: -0.7pt; font-size: 13.0pt; font-family: noto sans;"> </span>
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">with partner universities around the world</span>
	        </p>
	        <p style="font-family: noto sans;">
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">&nbsp; ② </span>
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">Studying Language</span>
		        <span style="letter-spacing: -0.7pt; font-size: 13.0pt; font-family: noto sans;"> </span><span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">(Korean, English and etc.)</span>
	        </p>
	        <div id="hwpEditorBoardContent" class="hwp_editor_board_content" data-hjsonver="1.0" data-jsonlen="8964" style="font-family: noto sans;"></div>
	        <p style="text-autospace: none; font-family: noto sans;">
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">&nbsp; ③ </span>
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">Admission of International Students</span>
		        <span style="letter-spacing: -0.7pt; font-size: 13.0pt; font-family: noto sans;"> </span><span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">for Korean Language, Undergraduate &amp; Graduate Courses</span>
	        </p>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; font-family: noto sans;"><br style="font-family: noto sans;"></p>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; font-family: noto sans;">
		        <span style="font-size: 16px; letter-spacing: -0.933333px; text-indent: 0px; font-family: noto sans;">-------</span>
	        </p>
	        <p style="font-family: noto sans;">
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">
			        <a href="http://int.kku.ac.kr" title="国际教育院" target="_blank" style="font-family: noto sans;"><i style="font-family: noto sans;">点击进入国际教育院, 可参考以下内容 (http://int.kku.ac.kr)</i></a>
		        </span>
	        </p>
	        <p style="font-family: noto sans;">
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">&nbsp; ① </span>
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">海外派遣项目</span>
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">&nbsp;(</span>
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">全球诸多国家交流大学)</span>
	        </p>
	        <p style="font-family: noto sans;">
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">&nbsp; ② </span>
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13.0pt; color: #9d5cbb;">语言课程</span>
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">&nbsp;(</span>
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">韩国语,&nbsp;</span>
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">英语等)</span>
	        </p>
	        <div id="hwpEditorBoardContent" class="hwp_editor_board_content" data-hjsonver="1.0" data-jsonlen="8781" style="font-family: noto sans;"></div>
	        <p style="text-autospace: none; font-family: noto sans;">
		        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-size: 13.0pt;">&nbsp; ③&nbsp;</span>
		        <span style="font-size: 13.3333px; font-family: noto sans;">
			        <span style="font-family: noto sans; letter-spacing: -0.7pt; font-weight: bold; font-size: 13pt; color: rgb(157, 92, 187);">入学申请&nbsp;</span>
		        </span>
		        <span style="font-family: noto sans; letter-spacing: 0pt; font-size: 13pt;">(</span>
		        <span style="font-family: noto sans; letter-spacing: 0pt; font-size: 13pt;">韩国语进修课程</span>		<span style="font-family: noto sans; letter-spacing: 0pt; font-size: 13pt;">, </span>
		        <span style="font-family: noto sans; letter-spacing: 0pt; font-size: 13pt;">本科课程</span>
		        <span style="font-family: noto sans; letter-spacing: 0pt; font-size: 13pt;">, </span>
		        <span style="font-family: noto sans; letter-spacing: 0pt; font-size: 13pt;">研究生课程</span>			<span style="font-family: noto sans; letter-spacing: 0pt; font-size: 13pt;">)</span>
	        </p>
	        <div id="hwpEditorBoardContent" class="hwp_editor_board_content" data-hjsonver="1.0" data-jsonlen="7627" style="font-family: noto sans;"></div>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; letter-spacing: -0.7pt; font-size: 12.0pt; font-family: noto sans;"><br style="font-family: noto sans;"></p>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; letter-spacing: -0.7pt; font-size: 12.0pt; font-family: noto sans;">  <!--[if !supportEmptyParas]-->-------</p>
	        <p style="text-autospace: none; font-weight: bold; font-style: italic; font-size: 13.0pt; font-family: noto sans;">
		        <a href="http://int.kku.ac.kr" title="Viện đào tạo quốc tế" target="_blank" style="font-family: noto sans;">
			        <span style="font-family: noto sans; letter-spacing: 0pt; font-size: 13pt;">Truy cập vào ‘Viện đào tạo quốc tế’ để tham khảo các nội dung sau&nbsp;</span></a>
		        <a href="http://int.kku.ac.kr/" title="国际教育院" target="_blank" style="font-style: normal; font-weight: normal; font-family: noto sans; font-size: 17.3333px; letter-spacing: -0.933333px;"><i style="font-family: noto sans;">(http://int.kku.ac.kr)</i></a>
	        </p>
	        <p style="line-height: 120%; text-autospace: none; font-size: 13.0pt; font-family: noto sans;">
		        <span style="font-family: noto sans; letter-spacing: 0pt; font-size: 13pt;">&nbsp; ① </span>			<span style="font-family: noto sans; letter-spacing: 0pt; font-weight: bold; font-size: 13.0pt; color: #783e94;">Chương trình trao đổi quốc tế</span>
		        <span style="font-size: 13pt; font-family: noto sans;"> </span>
		        <span style="font-family: noto sans; letter-spacing: 0pt; font-size: 13pt;">với các trường đại học đối tác trên toàn thế giới</span>
	        </p>
	        <p style="line-height: 120%; text-autospace: none; font-family: noto sans;">
		        <span style="font-family: noto sans; letter-spacing: 0pt; font-size: 13.0pt;">&nbsp; ② </span>		<span style="font-family: noto sans; letter-spacing: 0pt; font-weight: bold; font-size: 13.0pt; color: #783e94;">Học ngôn ngữ</span>
		        <span style="font-size: 13.0pt; font-family: noto sans;"> </span>
		        <span style="font-family: noto sans; letter-spacing: 0pt; font-size: 13.0pt;">( tiếng Hàn, tiếng Anh v.v.)</span>
	        </p>
	        <p style="text-autospace: none; font-weight: bold; font-style: italic; font-size: 14.0pt; font-family: noto sans;"></p>
	        <div id="hwpEditorBoardContent" class="hwp_editor_board_content" data-hjsonver="1.0" data-jsonlen="12676" style="font-family: noto sans;"></div>
	        <p style="line-height: 120%; text-autospace: none; font-family: noto sans;">
		        <span style="font-family: noto sans; letter-spacing: 0pt; font-size: 13.0pt;">&nbsp; ③ </span>		<span style="font-family: noto sans; letter-spacing: 0pt; font-weight: bold; font-size: 13.0pt; color: #783e94;">Du học sinh nhập học</span>
		        <span style="font-size: 13.0pt; font-family: noto sans;"> </span>
		        <span style="font-family: noto sans; letter-spacing: 0pt; font-size: 13.0pt;">cho khóa học tiếng Hàn, đại học và sau đại học</span>
	        </p>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; letter-spacing: -0.7pt; font-size: 12.0pt; font-family: noto sans;"><br style="font-family: noto sans;"></p>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; letter-spacing: -0.7pt; font-size: 12.0pt; font-family: noto sans;">  <!--[if !supportEmptyParas]-->&nbsp;<!--[endif]-->  </p>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; font-family: noto sans;">
		        <span style="font-family: noto sans; font-size: 13pt; letter-spacing: 0pt;">☞&nbsp;</span>
		        <a href="http://int.kku.ac.kr" title="국제교육원" target="_blank" style="font-family: noto sans;"><i style="font-family: noto sans;"><b style="font-family: noto sans;">대외협력처 국제교육원 홈페이지 바로가기</b></i></a>
	        </p>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; font-family: noto sans;">
		        <span style="font-family: noto sans; font-size: 13pt; letter-spacing: 0pt;">☞&nbsp;</span>
		        <a href="http://int.kku.ac.kr" title="Institute of International Education" target="_blank" style="font-family: noto sans;"><i style="font-family: noto sans;"><b style="font-family: noto sans;">Visit the website of Institute of International Education</b></i></a>
	        </p>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; font-family: noto sans;">
		        <span style="font-family: noto sans; font-size: 13pt; letter-spacing: 0pt;">☞&nbsp;</span>
		        <a href="http://int.kku.ac.kr" title="国际教育院" target="_blank" style="font-family: noto sans;"><b style="font-family: noto sans;"><i style="font-family: noto sans;">点击进入国际教育院网站</i></b></a>
	        </p>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; font-family: noto sans;">
		        <span style="letter-spacing: 0pt; font-family: noto sans; font-size: 13pt;">☞&nbsp;</span>
		        <span style="font-family: noto sans; font-size: 14pt; letter-spacing: 0pt;"><b style="font-family: noto sans;"><u style="font-family: noto sans;">
			        <a href="http://int.kku.ac.kr" title="Viện đào tạo quốc tế" target="_blank" style="font-family: noto sans;">Truy câp vào trang web của ‘Viện đào tạo quốc tế’</a></u></b>
		        </span>
	        </p>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; font-family: noto sans;"><br style="font-family: noto sans;"></p>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; font-family: noto sans;"><br style="font-family: noto sans;"></p>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; font-family: noto sans;"><br style="font-family: noto sans;"></p>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; font-family: noto sans;"><br style="font-family: noto sans;"></p>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; font-family: noto sans;"><br style="font-family: noto sans;"></p>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; font-family: noto sans;"><br style="font-family: noto sans;"></p>
	        <p style="margin-left: 28.5pt; text-indent: -28.5pt; text-autospace: none; font-family: noto sans;"><br style="font-family: noto sans;"></p>
        </div>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView 
        originWhitelist={['*']} 
        source={{ html: htmlContent }} 
        style={{ flex: 1 }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Test;
