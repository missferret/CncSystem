-- Last Change 05/04/2020

declare @out_json	NVARCHAR(max) 

EXEC dbo.stp_GetReservedBeds 
	@out_json = @out_json OUTPUT

select @out_json

