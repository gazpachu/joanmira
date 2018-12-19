---
title: "An introduction to mobile development"
cover: images/mob_dev_dwbkru.jpg
category: work
---

To understand the mobile development scene, we must first know who are the present industry leaders and who are the new contenders for 2013/14.

In Q4 2012, the most used mobile operating systems were **Android** (with the 68.4% of market share) **and** **iOS** (with the 19.4% of market share). Both together grabbed the [92% of the global Smartphone shipments](http://techcrunch.com/2013/01/28/android-ios-grabbed-92-of-global-smartphone-shipments-in-q4-2012-android-undisputed-volume-leader-says-analyst/). These results make [Java](http://en.wikipedia.org/wiki/Java_(programming_language)) (Android) and [Objective-C](http://en.wikipedia.org/wiki/Objective-C) (iOS) [two of the most used programming languages for mobile development](http://www.tiobe.com/index.php/content/paperinfo/tpci/index.html), but that’s only when we are talking about apps built using the [Android SDK](http://developer.android.com/sdk/index.html) or the [iOS SDK](https://developer.apple.com/devcenter/ios/index.action).

The other mobile operating systems already in the market are [Windows Phone](http://www.windowsphone.com/en-gb) and [Blackberry 10](http://global.blackberry.com/blackberry-10.html), but their market share is still very small. In the following months we can expect the following releases:

- [Firefox OS](http://www.mozilla.org/en-US/firefoxos/) from [Mozilla](http://www.mozilla.org/en-US/firefoxos/)
- [Ubuntu Mobile](http://www.ubuntu.com/devices/phone) from [Ubuntu](http://www.ubuntu.com/devices/phone)
- [Tizen](https://www.tizen.org/) from [Linux Foundation](http://www.linuxfoundation.org/), [Samsung](http://www.samsung.com/), [Intel](http://www.intel.com/), [Tizen Community](https://www.tizen.org/community)

You can read more about mobile operating systems [here](http://en.wikipedia.org/wiki/Comparison_of_mobile_operating_systems) and [here](http://en.wikipedia.org/wiki/Mobile_operating_system)

**The pros and cons of native coding**

The benefits of building native apps are all related to maximum flexibility and performance. All programmers know that using the lowest level programming languages give you the possibility to tweak the apps, customize them and optimize the code to the maximum level. This is possible because you are working almost directly with the hardware; there are no unnecessary layers of complexity in between your code and the device.

The apps that rely heavily on 3D graphics and need to process a lot of data or make intensive use of the [CPU](http://en.wikipedia.org/wiki/CPU) are the best candidates for the native code approach.

But flexibility and performance have a price and that is complexity and duplicate [codebases](http://en.wikipedia.org/wiki/Codebase). If you want your native app to be compatible with Android and iOS, then you need to have two different [codebases](http://en.wikipedia.org/wiki/Codebase), which means you have to work double. [Java](http://en.wikipedia.org/wiki/Java_(programming_language)) and [Objective-C](http://en.wikipedia.org/wiki/Objective-C) are two very different programming languages, they require completely different programming environments and maintaining the code ([refactoring](http://en.wikipedia.org/wiki/Refactoring)) can become expensive for individuals or organizations that don’t have a team of developers working full time in mobile apps.

**What are the alternatives?**

Luckily or not, there are several companies with products that promise to solve the hassle of having two or more different codebases for the same app. These products allow developers to use [common APIs](http://en.wikipedia.org/wiki/Api) to build the apps and then “export” them to native Java (Android), Objective-C code (iOS) or even other platforms like Kindle Fire, Blackberry, Windows Phone, etc:

- [Appcelerator](http://www.appcelerator.com/) and its free JavaScript driven [Titanium SDK](http://www.appcelerator.com/platform/titanium-platform/) and [Cloud services](http://www.appcelerator.com/cloud/). They advertise their success with more than **50.000 apps deployed** in the market, **419,000 developers** and customers like eBay, Merck, Mitsubishi Electric, NBC, and PayPal. [Showcase of apps](http://pinterest.com/appcelerator/app-showcase/).After having tested the platform for several months, I can say that the product certainly works and the learning curve is fairly smooth, which makes the development process quite fun. Although [not everything is as marvellous as they say](http://usingimho.wordpress.com/2011/06/14/why-you-should-stay-away-from-appcelerators-titanium/).
- [Marmalade](http://www.madewithmarmalade.com/) is one of the best game development frameworks out there. Whether you choose to code natively (C++) or take a hybrid (HTML5-native) approach, with Marmalade you can deploy to iOS, Android, BlackBerry, Windows and Mac, as well as selected Smart TVs and (shortly) set top box platforms as well. Clients: **Electronic Arts, Nokia, Apple, Konami, Google, Square Enix, nVidia, Samsung**, etc. [App showcase](http://www.madewithmarmalade.com/app-showcase).
- [Adobe PhoneGap](http://phonegap.com/) is a free and open source framework that allows you to create mobile apps using standardized web APIs like HTML5, CSS and JavaScript. They have **400,000 developers** and contributors from IBM, RIM and Microsoft. [App showcase](http://phonegap.com/app/).
- [Corona SDK](http://www.coronalabs.com/products/corona-sdk/) is a well known framework for mobile game developers. From a single codebase you can deploy to iOS, Android, Kindle Fire and NOOK. [App showcase](https://developer.coronalabs.com/showcase).
- [Xamarin](http://xamarin.com/) is another company/product to develop apps for iOS, Android and Mac using [C#](http://en.wikipedia.org/wiki/C_Sharp_(programming_language)). They have **230,245 developers** and customers like 3M, Microsoft, VMWare, Accenture, Cisco, AT&T, Aol, Monster and HP. [App showcase](http://xamarin.com/apps).
- [Shiva3D](http://www.shivaengine.com/new-features.html) and [Unity3D](http://unity3d.com/unity/multiplatform/) are options more focussed in high level multiplatform 3D games. [Shiva showcase](http://www.shivaengine.com/shiva-3d-engine-showcase.html). [Unity showcase](http://unity3d.com/gallery/made-with-unity/game-list).
- [MoSync SDK](http://www.mosync.com/sdk) is a less known option that makes it easy to build and compile apps for up to nine different platforms at once, using C/C++ or HTML5/JavaScript, or a combination of both. [App showcase](http://www.mosync.com/showcase).
- [Biznessapps](http://www.biznessapps.com/) and [gamesalad](http://gamesalad.com/) are fast and easy solutions for small business and simple games with low requirements of custom programming and design. These solutions are **not recommended** for the vast majority of projects due to the limitations of the editors used to build the apps and their lack of flexibility.
- For an extended comparison chart of mobile frameworks, please visit [this link](http://www.markus-falk.com/mobile-frameworks-comparison-chart/), [this wiki page](http://en.wikipedia.org/wiki/Multiple_phone_web-based_application_framework) or [this other one](http://en.wikipedia.org/wiki/Mobile_application_development).

**What are the challenges for both, native and non-native apps?**

Programming mobile apps is harder than building desktop or web apps. The platform is very new and is getting more and more fragmented, which doesn’t help developers.

In example, [Android has hundreds of different devices](http://en.wikipedia.org/wiki/Comparison_of_Android_devices) in the market. Some of them have a 3.4’’ screen, others 7’’ or 10’’. Some of them run Android 2.1 and others run Android 4.3. Some of them have 3G, GPS and a 300dpi (dots per inch / pixel density), HD Ready or Full HD screen. The possible combinations are really intimidating and the truth is that every single user expects that your app will work flawlessly in his device.

**Some important aspects to bear in mind are:**

- Deciding which tool/framework/approach to use is a critical decision that should be carefully thought before starting any development work
- Performance in old devices… the bar has to be set at some point.
- Responding quickly and successfully to complaints/bugs/feature requests in the Android market and App store. Remember about having duplicate codebases…
- Finding the right marketing approach and value for an app ([freemium](http://en.wikipedia.org/wiki/Freemium) scheme or ads based). Some marketing strategies require a lot of customization in the code. Make sure to plan everything in advance.
