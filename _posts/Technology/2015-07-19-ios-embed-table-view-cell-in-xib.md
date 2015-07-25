---
layout: post
title: iOS UI -- Custom UI with Embeded Table View Cell
category: Technology
tag: iOS
lan: EN
---

In an .xid file, you can not define a custom Table View Cell in the Table View. (Although you can do it in storyboard).

If you want to do so, you have to create the Table View Cell by codes.

<!--preview-->

In a .xib file, if you want to embeded a Table View Cell inside the Tabel View, your latest Xcode, might be Version 6.4 would not allow you to do so before compiling.

However in the previous versions, you can `do` that but you will encounter a compiling error. Somewhat similar to you can not put a __placeholder__ inside an .xib file.

![Xcode Version 6.4](/images/ios_table_cell/xcode-version-6.4.png)

Not like in a storyboard, you can define the custom table view cell as a placeholder directly.

![Table View Cell in Storyboard](/images/ios_table_cell/storyboard-tableviewcell.png)

Fortunatelly, you can always do that programmly.

### Step 1. Define you own table view cell in another .xib file

![custom Table View Cell](/images/ios_table_cell/custom-tableviewcell.png)

### Step 2. Define your custom view in .xib file

Just do what you had planned to do, except including the Table View Cell inside Table View.

### Step 3. Put your custom Table View Cell as subviews inside Table View by coding

In the class of your custom view, creating those rows by coding.

For example, I implement the interface of `<UITableViewDelegate, ChartViewDelegate>` of the class of my custom UIView

    @class CustomView;

    @interface CustomView : UIView <UITableViewDataSource, UITableViewDelegate>

    @end

And You can create each row with the sytle of your predefined custom table view cell in the `cellForRowAtIndexPath` method of `UITableViewDataSource` interface.

    @implementation CustomView

    - (UITableViewCell *)tableView:(UITableView *)tableView 
    cellForRowAtIndexPath:(NSIndexPath *)indexPath {
        static NSString *cellIdentifier = @"myCell";
        MyCustomCell *cell = (MyCustomCell *)
            [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
        if (!cell) {
            cell = (MyCustomCell *)[[[NSBundle mainBundle] 
                loadNibNamed:@"MyCustomCell" owner:self options:nil] lastObject];
        }
        ...
            return cell;
    }

    @end

## Reference

1. [iOS - Create UITableView With Custom Cell Programmatically](http://jslim.net/blog/2013/03/22/ios-create-uitableview-with-custom-cell-programmatically/)

2. [Creating Custom UITableViewCell using Nib (.xib) files in XCode](https://medium.com/@musawiralishah/creating-custom-uitableviewcell-using-nib-xib-files-in-xcode-9bee5824e722)
This guide you how to define your own Table View Cell and then you can add it to the table view programmically.
