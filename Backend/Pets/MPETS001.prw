#INCLUDE "TOTVS.CH"
#INCLUDE "FWMVCDEF.CH"

User Function MPETS001()
	Local oMBrowse 	:= Nil

	oMBrowse := FWMBrowse():New()
	oMBrowse:SetAlias("ZSA")
	oMBrowse:SetDescription("Pets")
	oMBrowse:SetCanSaveArea(.T.)
	oMBrowse:SetMenudef("MPETS001")
	oMBrowse:Activate()
Return Nil

Static Function MenuDef()
	Local aRotina := {}

	ADD OPTION aRotina TITLE "Opção 1" 	ACTION "PesqBrw" 			    OPERATION 1 ACCESS 0 // "Pesquisar"
	ADD OPTION aRotina TITLE "Opção 2"	ACTION "VIEWDEF.MPETS001" 	OPERATION 2	ACCESS 0 // "Visualizar"
	ADD OPTION aRotina TITLE "Opção 3"	ACTION "VIEWDEF.MPETS001" 	OPERATION 8 ACCESS 0 // "Imprimir"
Return aRotina

Static Function ModelDef() as Object
    Local oModel        as Object
    Local oStructZSA    := FWFormStruct(1,'ZSA',/*bAvalCampo*/,/*lViewUsado*/)

    oModel := MPFormModel():New("PETS001",/*bPreValidacao*/,/*bPosValid*/,/*bCommit*/,/*bCancel*/)
    oModel:AddFields("ZSAMASTER",/*cOwner*/,oStructZSA,/*bPreValidacao*/,/*bPosValidacao*/,/*bCarga*/)
    oModel:GetModel("ZSAMASTER"):SetDescription("ZSA")
	oModel:SetPrimaryKey({"ZSA_FILIAL", "ZSA_ID"})
    oModel:SetDescription("Pets")
Return oModel

Static Function ViewDef()
	Local oView
	Local oModel 		:= ModelDef()
	Local oStructZSA	:= FWFormStruct(2,"ZSA",/*bAvalCampo*/,/*lViewUsado*/)

	oView := FWFormView():New()
	oView:SetModel(oModel)
	oView:AddField("VIEW_ZSA",oStructZSA,"ZSAMASTER")
Return oView
