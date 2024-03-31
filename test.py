# 第一步先import所需模块（rpcxxxapi，xxx为对应项目的名字）
# rpcwpsapi模块为WPS文字项目的开发接口
# rpcwppapi则是WPS演示的
# rpcetapi毫无疑问就是WPS表格的了
# 另外还有common模块，为前三者的公共接口模块，通常不能单独使用

# 调起WPS必需通过createXXXRpcInstance接口，所以导入它是必需的
# 以WPS文字为例
from pywpsrpc.rpcwpsapi import (createWpsRpcInstance, wpsapi)
from pywpsrpc import RpcIter


# 这里仅创建RPC实例
hr, rpc = createWpsRpcInstance()

# 注意：
# WPS开发接口的返回值第一个总是HRESULT（无返回值的除外）
# 通常不为0的都认为是调用失败（0 == common.S_OK）
# 可以使用common模块里的FAILED或者SUCCEEDED去判断

# 通过rpc实例调起WPS进程
hr, app = rpc.getWpsApplication()

# 比如添加一个空白文档
hr, doc = app.Documents.Add()

# 加点文字
selection = app.Selection
selection.InsertAfter("Hello, world")

# 将前面插入的"Hello, world"加粗
selection.Font.Bold = True

# 光标移到末尾
selection.EndKey()

# 再插入空段
selection.InsertParagraph()

# 光标移到新段
selection.MoveDown()

# 再码些文字
selection.TypeText("pywpsrpc~")

# 使用RpcIter遍历所有段
paras = doc.Paragraphs
for para in RpcIter(paras):
    print(para.Range.Text)

# 或者通过索引方式
for i in range(0, paras.Count):
    # 注意：首个元素总是从1开始
    print(paras[i + 1].OutlineLevel)

def onDocumentBeforeSave(doc):
    # 如果想取消当前文档保存，第二个返回值设为True
    print("onDocumentBeforeSave called for doc: ", doc.Name)
    # SaveAsUI, Cancel
    return True, False

# 注册文档保存前通知
rpc.registerEvent(app,
                  wpsapi.DIID_ApplicationEvents4,
                  "DocumentBeforeSave",
                  onDocumentBeforeSave)

# 保存文档, onDocumentBeforeSave会被调用到
doc.SaveAs2("/home/lht/Pictures/test.docx")

# 退出WPS进程
# 使用wpsapi.wdDoNotSaveChanges来忽略文档改动
app.Quit(wpsapi.wdDoNotSaveChanges)
