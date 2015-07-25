---
layout: post
title: iOS Delegate -- Respond UI Event by Delegate
category: Technology
tag: iOS
lan: EN
---

In the [last post](/way/ios-embed-table-view-cell-in-xib/) I talked about how to Customsize an UI Widget.

There is a use case that we would like to respond some UI event of the widget in one View Controller.

The logic is rely on the outside View Controller.

Also, if I put several this kind of widgets on the same screen, their click event should be different which I would like to impelment respectively.

<!--preview-->

Here comes the __delegate__!

Let's assume a use case: I want to refresh my widget data by click the refresh UIButton on the upper right corner of my widget.

On the meantime, my widget will be reused. So I want to put the touch event logic outside of the Widget class.

## In Widget class

![Widget](/images/ios-delegate/widget.png)

### Step 1. Define the touch UIButton event on Widget

### Step 2. Define the Delegete method signature which will be common for each button event

    @class ApidaeCustomView;

    @protocol RefreshDataDelegate <NSObject>
    @required
    - (void)refreshData;
    @end

    @interface ApidaeCustomView : UIView
    @property (weak, nonatomic) IBOutlet UIButton *refreshButton;
    - (IBAction)touchRefreshButton:(id)sender;
    @property (nonatomic, assign) id <RefreshDataDelegate> dataDelegate ;
    @end

### Step 3. Implement the touch UIButton event, calling the Delegate method

    #import "ApidaeCustomView.h"

    @interface ApidaeCustomView ()
    @end
    @implementation ApidaeCustomView
    - (IBAction)touchRefreshButton:(id)sender {
        NSLog(@"touch refresh UIButton...");
        if (dataDelegate != nil) {
            [dataDelegate refreshData]; //!!! call delegate method
        }
        [self loadData];
    }
    @end

## In View Controller class

![View Controller](/images/ios-delegate/viewController.png)

### Step 4. Implement the Delegate in the View Controller which has this Widget

    @interface TestCustomViewController : UIViewController <RefreshDataDelegate>
    @end

    #import "TestCustomViewController.h"

    @interface TestCustomViewController ()
    @property (weak, nonatomic) IBOutlet ApidaeCustomView *apiCustomViewOne;
    @end

    @implementation TestCustomViewController
    - (void)refreshData {
        NSLog(@"refreshData called at Controller....");
        [self refreshMyData];
    }
    @end

## Reference

