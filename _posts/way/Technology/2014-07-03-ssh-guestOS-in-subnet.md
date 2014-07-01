---
layout: post
title: Remote SSH to VMware GuestOS
category: Technology
tag: ['VMware','network','SSH']
lan: CN
---

在NAT网络配置下，很多人都可以很轻松地从Host OS上ssh到VMware的Guest OS，只需要把Host OS和Guest OS当作是在由VMware所管理的同一个子网下的两台机器就可以了。

那么如果我有另一台笔记本或者手机，想要SSH到我台式机中VMware下的一台虚拟机该如何操作呢？

<!--preview-->

大部分人会想到把网络配置成Bridged，这样VMware的GuestOS就可以看作是和HostOS在同一个路由器所管理的子网下的另一台机器（而不是由VMware所管理的子网，家中路由器的子网 和 VMware所管理的子网 的ip段也不同）。

但是如果我不想频繁更改VMware的网络设置，即是在NAT网络配置下，我依然想从我的笔记本或者手机上来登录我在台式机上的虚拟机；该如何操作？

分两步走：

## 1. VMware配置端口转发(Port Forwarding)

第一步很多人都很熟悉，就是配置端口转发

* 找到VMware的`Virtual Network Editor`功能

![Virtual Network Editor](/images/ssh_to_vmware/virtual_network_editor.png)

* 选中`VMnet8`这行，点击`NAT Settings..`按钮

![NAT Settings..](/images/ssh_to_vmware/nat_settings.png)

* 添加一条Port Forwarding记录，点击`Add`按钮后按如下配置：

![Mapping Incoming Port](/images/ssh_to_vmware/add_port_forwarding2.png)

其中`Host port`是你以后ssh到宿主机的端口，即HostOS的端口5022收到ssh请求，会自动转发到GuestOS的22端口。其中`Virtual machine IP address`就是你的GuestOS在VMware子网管理下的ip地址。

你可以在GuestOS运行一下这条命令来获取IP地址

    ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'

* 添加完成效果图，然后一路OK完成

![Mapping Incoming Port](/images/ssh_to_vmware/add_port_forwarding1.png)

## 2. 宿主机中配置TCP端口重新映射(TCP Port Remapping)

这里要用到一个工具<a href="http://www.paul.vc/files/rinetd-bin.zip" title="点击下载zip包"  download>Rinetd slightly patched version</a>，当然通过命令行也可以完成。

其中有需要配置的文件`rinetd.conf`，第一个地址为宿主机在网络中的ip，第二个地址为127.0.0.1即localhost的ip地址，端口都是需要转发的代理端口号。

然后运行rinetd.exe就可以了。

![rinetd](/images/ssh_to_vmware/rinetd.png)

## 在床上、沙发上、饭桌上 coding

完成了以上这些，我就可以快乐地躺在床上用手机或者iPad coding了...当然，应该主要还是拿着老笔记本到楼下去边扯淡边写程序。

![coding at restroom....](/images/ssh_to_vmware/restroom.png)

<blockquote>
参考: <br/>
<a href="http://server-support.co/blog/pc/accessing-vmware-guest-os-behind-nat-from-another-computer/">Accessing Vmware guest OS behind NAT from another computer</a> <br/>
<a href="http://www.virten.net/2013/03/how-to-setup-port-forwarding-in-vmware-workstation-9/">How to Setup Port Forwarding in VMware Workstation 9</a>
</blockquote>
