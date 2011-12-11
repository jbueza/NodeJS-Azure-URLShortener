# NodeJS Windows Azure URL Shortener

This is a cute little app that was written in an attempt to hack on some Azure Table Storage.

## Installation (using PowerShell)

* git clone git@github.com:AgileBusinessCloud/NodeJS-Azure-URLShortener.git
* cd NodeJS-Azure-URLShortener
* edit the generated Web.cloud.config file and add appSettings nodes
* Type in PowerShell: <code>Start-AzureEmulator -launch</code>


## Sample Web.cloud.config

<pre><?xml version="1.0" encoding="utf-8"?>
<!--
  For more information on how to configure your ASP.NET application, please visit
  http://go.microsoft.com/fwlink/?LinkId=169433
  -->
<configuration>

	<!-- http://windows.azure.com portal -->
  <appSettings>
    <add key="AZURE_STORAGE_ACCOUNT" value="{ENTER SUBSCRIPTION ID HERE}"/>
    <add key="AZURE_STORAGE_ACCESS_KEY" value="{ENTER KEY HERE}"/>
  </appSettings>
  
  <system.webServer>
    <modules runAllManagedModulesForAllRequests="false" />
    
    <!-- NOTE: By default, debugging and logging are unsecure and should not be enabled for production applications in the cloud.-->
    <iisnode 
      debuggingEnabled="false"
      loggingEnabled="false"
      devErrorsEnabled="false"
    />

    <!-- indicates that the server.js file is a node.js application 
    to be handled by the iisnode module -->
    <handlers>
      <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
    </handlers>
    <rewrite>
      <rules>
        <clear />
        <rule name="app" enabled="true" patternSyntax="ECMAScript" stopProcessing="true">
            <match url="server\.js.+" negate="true" />
            <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
            <action type="Rewrite" url="server.js" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
</pre>

## MIT License

URL Shortener with NodeJS and Windows Azure Table Storage

Copyright (c) 2011 Agile Business Cloud

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.