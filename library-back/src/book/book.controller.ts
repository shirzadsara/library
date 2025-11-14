import { Body, Controller, Post,Get,Patch,Delete,Param } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateDto,UpdateDto } from './book.dto';

@Controller('books')
export class BookController {
    constructor(private readonly bookservice:BookService)
    {}
    @Post()
    Create(@Body() data:CreateDto){
this.bookservice.create(data)
    }
    @Get()
    findAll(){
        return this.bookservice.findAll();
    }
      @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookservice.findOne(+id);
  }


@Get('admin/:id')
async findOne2(@Param('id') id: number) {
  return this.bookservice.findOne(+id);
}



  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateDto) {
    return this.bookservice.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookservice.remove(+id);
  }
}
