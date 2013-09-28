---
layout: post
title: Some Useful Android Programming Snips
category: Technology
tag: Android
lan: EN
---

Digest: all activity in app, detect string & uni-code char, intent, dp/sp/px, screen size, available memory

<!--preview-->


##1. Get all Activity of applicaiton<br /><br />

        public static ArrayList<String> getActivities(Context ctx) {
            ArrayList<String> result = new ArrayList<String>();
            Intent intent = new Intent(Intent.ACTION_MAIN, null);
            intent.setPackage(ctx.getPackageName());
            for (ResolveInfo info : ctx.getPackageManager().queryIntentActivities(intent, 0)) {
                result.add(info.activityInfo.name);
            }
            return result;
        }

##2. Detect whether Chinese characters in string<br /><br />

        public static boolean checkChinese(String sequence) {
            final String format = "[\u4E00-\u9FA5\uF900-\uFA2D]";
            boolean result = false;
            Pattern pattern = Pattern.compile(format);
            Matcher matcher = pattern.matcher(sequence);
            result = matcher.find();
            return result;
        }

##3. Verify a string only contains: Chinese, Number, underline(_), bar(-)<br /><br />

        public static boolean checkNickname(String sequence) {
            final String format = "[^\u4E00-\u9FA5\uF900-\uFA2D\w-_]";
            Pattern pattern = Pattern.compile(format);
            Matcher matcher = pattern.matcher(sequence);
            return !matcher.find();
        }

##4. Detect whether there is an applicaiton could handle my intent<br /><br />

        public static boolean isIntentAvailable(Context context, String action) {
            final PackageManager packageManager =context.getPackageManager();
            final Intent intent = new Intent(action);
            List<ResolveInfo> list = packageManager.queryIntentActivities(intent, PackageManager.MATCH_DEFAULT_ONLY);
            return list.size() > 0;
        }

##5. 使用TransitionDrawable实现渐变效果（比使用AlphaAnimation效果要好，可避免出现闪烁问题）<br /><br />

        private void setImageBitmap(ImageView imageView, Bitmap bitmap) {
            // Use TransitionDrawable to fade in.
            final TransitionDrawable td = new TransitionDrawable(new Drawable[] { new ColorDrawable(android.R.color.transparent), new BitmapDrawable(mContext.getResources(), bitmap) });
            //noinspection deprecation
                imageView.setBackgroundDrawable(imageView.getDrawable());
            imageView.setImageDrawable(td);
            td.startTransition(200);
        }

##6. Android中dp、sp和px的相互转换
（在此之前px和sp相互转换一直都用density，后来才发现是错的，有些手机上density和scaledDensity的值一样所以没发现有什么区别，但是在大分辨率的手机上两个值不一样，导致转换出来的字体尺寸有问题）

    /**
      * 将px值转换为dip或dp值，保证尺寸大小不变
      * 
      * @param pxValue
      * @param scale（DisplayMetrics类中属性density）
      * @return
      */
    public static int px2dip(float pxValue, float scale) {
        return (int) (pxValue / scale + 0.5f);
    }

    /**
    * 将dip或dp值转换为px值，保证尺寸大小不变
    * 
    * @param dipValue
    * @param scale（DisplayMetrics类中属性density）
    * @return
    */
    public static int dip2px(float dipValue, float scale) {
      return (int) (dipValue * scale + 0.5f);
    }

    /**
    * 将px值转换为sp值，保证文字大小不变
    * 
    * @param pxValue
    * @param fontScale（DisplayMetrics类中属性scaledDensity）
    * @return
    */
    public static int px2sp(float pxValue, float fontScale) {
        return (int) (pxValue / fontScale + 0.5f);
    }

    /**
    * 将sp值转换为px值，保证文字大小不变
    * 
    * @param spValue
    * @param fontScale（DisplayMetrics类中属性scaledDensity）
    * @return
    */
    public static int sp2px(float spValue, float fontScale) {
        return (int) (spValue * fontScale + 0.5f);
    }

##7. 精确获取屏幕尺寸（例如：3.5、4.0、5.0寸屏幕）<br /><br />

    public static double getScreenPhysicalSize(Activity ctx) {
        DisplayMetrics dm = new DisplayMetrics();
        ctx.getWindowManager().getDefaultDisplay().getMetrics(dm);
        double diagonalPixels = Math.sqrt(Math.pow(dm.widthPixels, 2) + Math.pow(dm.heightPixels, 2));
        return diagonalPixels / (160 * dm.density);
    }

##8. 判断是否是平板（官方用法）<br /><br />

    public static boolean isTablet(Context context) {
        return (context.getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) >= Configuration.SCREENLAYOUT_SIZE_LARGE;
    }

##9. 启动APK的默认Activity<br /><br />

    public static void startApkActivity(final Context ctx, String packageName) {
        PackageManager pm = ctx.getPackageManager();
        PackageInfo pi;
        try {
            pi = pm.getPackageInfo(packageName, 0);
            Intent intent = new Intent(Intent.ACTION_MAIN, null);
            intent.addCategory(Intent.CATEGORY_LAUNCHER);
            intent.setPackage(pi.packageName);
    List<ResolveInfo> apps = pm.queryIntentActivities(intent, 0);
    ResolveInfo ri = apps.iterator().next();
            if (ri != null) {
                String className = ri.activityInfo.name;
                intent.setComponent(new ComponentName(packageName, className));
                ctx.startActivity(intent);
            }
        } catch (NameNotFoundException e) {
            Log.e("startActivity", e);
        }
    }

##10. 计算字宽<br /><br />

    public static float GetTextWidth(String text, float Size) {
        TextPaint FontPaint = new TextPaint();
        FontPaint.setTextSize(Size);
        return FontPaint.measureText(text);
    }
    （注意如果设置了textStyle，还需要进一步设置TextPaint。）

##11. 半角、全角字符转换<br /><br />

    /**
     * 半角转全角
     * 
     * @param input
     *            String.
     * @return 全角字符串.
     */
    public static String ToSBC(String input) {
        char c[] = input.toCharArray();
        for (int i = 0; i < c.length; i++) {
            if (c[i] == ' ') {
                c[i] = 'u3000'; // 采用十六进制,相当于十进制的12288

            } else if (c[i] < '177') { // 采用八进制,相当于十进制的127
                c[i] = (char) (c[i] + 65248);

            }
        }
        return new String(c);
    }

    /**
     * 全角转半角
     * 
     * @param input
     *            String.
     * @return 半角字符串
     */
    public static String ToDBC(String input) {

        char c[] = input.toCharArray();
        for (int i = 0; i < c.length; i++) {
            if (c[i] == 'u3000') {
                c[i] = ' ';
            } else if (c[i] > 'uFF00' && c[i] < 'uFF5F') {
                c[i] = (char) (c[i] - 65248);

            }
        }
        String returnString = new String(c);

        return returnString;
    }

##12. 查看应用最高可用内存（转自：http://my.eoe.cn/sisuer/archive/5917.html）<br /><br />

    int maxMemory = (int) (Runtime.getRuntime().maxMemory() / 1024);  
    Log.d("TAG", "Max memory is " + maxMemory + "KB");

##13. InputStream转换成字符串<br /><br />

    /**
     * 将一个输入流转换成制定编码的字符串
     * 
     * @param @param inputStream
     * @param @param encode
     */
    private static String changeInputStream(InputStream inputStream,
            String encode) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        byte[] data = new byte[1024];
        int len = 0;
        String result = "";
        if (inputStream != null) {
            try {
                while ((len = inputStream.read(data)) != -1) {
                    outputStream.write(data, 0, len);
                }
                result = new String(outputStream.toByteArray(), encode);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }

##14. Html Style TextView<br /><br />

    TextView textView = (TextView)findViewById(R.id.textview);  
      
    // Method 1:  
    textView.setText(Html.fromHtml("<font color=\"#ff0000\">红色</font>其它颜色"));  
      
    // Method 2: 
    String text = "获得银宝箱!";  
    SpannableStringBuilder style=new SpannableStringBuilder(text);     
    style.setSpan(new BackgroundColorSpan(Color.RED),2,5,Spannable.SPAN_EXCLUSIVE_INCLUSIVE);     //设置指定位置textview的背景颜色  
    style.setSpan(new ForegroundColorSpan(Color.RED),0,2,Spannable.SPAN_EXCLUSIVE_INCLUSIVE);     //设置指定位置文字的颜色  
    textView.setText(style);

##15. C Language Style Output<br /><br />

    String text = String.format(getResources().getString(R.string.baoxiang), 2,18,"银宝箱");

in corresponding string.xml:

    <string name="baoxiang">您今天打了%1$d局,还差%2$d局可获得%3$s!</string>  
    %1$d表达的意思是整个name=”<span style="white-space: pre;">baoxiang</span>”字符串中，第一个整型%1$d表达的意思是整个name=”<span style="white-space: pre;">baoxiang</span>”字符串中，第一个整型

Generally, `14` and `15` are used simultaneously to avoid using too much String concatenation


<blockquote>
声明：1-13条部分转载自<br />
作者： lanxj0703<br />
地址： http://my.eoe.cn/535140/archive/5889.html<br />
<br />
声明：14-15条部分转载自<br />
作者： 我辛飞翔<br />
地址： http://www.cnblogs.com/622698abc/archive/2013/04/26/3044363.html
</blockquote>